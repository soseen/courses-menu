import type {CSSProperties, ReactNode} from 'react'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type {DragEndEvent} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import {useMenuStudio} from '../context/useMenuStudio'
import {DragIcon, EditIcon, EyeIcon, EyeOffIcon, ImageIcon} from '../icons'
import {
  AvailabilityDot,
  CourseList as CourseListContainer,
  CourseOpenButton,
  CoursePrice,
  CourseRow,
  CourseThumbnail,
  DragHandle,
  EmptyState,
  IconButton,
} from '../styles'
import type {MenuItem} from '../types'
import {getImageUrl} from '../utils'

type CourseListProps = {
  categoryKey: string
  items: MenuItem[]
}

type SortableCourseProps = {
  children: (handle: ReactNode) => ReactNode
  hidden: boolean
  id: string
  label: string
}

function SortableCourse({children, hidden, id, label}: SortableCourseProps) {
  const {attributes, isDragging, listeners, setNodeRef, transform, transition} = useSortable({id})
  const style: CSSProperties = {
    opacity: isDragging ? 0.55 : hidden ? 0.58 : 1,
    position: 'relative',
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : undefined,
  }

  const dragHandle = (
    <DragHandle
      {...attributes}
      {...listeners}
      aria-label={`Drag to reorder ${label}`}
      title="Drag to reorder course"
      type="button"
    >
      <DragIcon />
    </DragHandle>
  )

  return (
    <CourseRow ref={setNodeRef} style={style}>
      {children(dragHandle)}
    </CourseRow>
  )
}

export function CourseList({categoryKey, items}: CourseListProps) {
  const {dataset, openCourseEditor, projectId, reorderCourses, toggleCourseVisibility} =
    useMenuStudio()
  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 5}}),
    useSensor(TouchSensor, {activationConstraint: {delay: 150, tolerance: 6}}),
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates}),
  )

  const handleDragEnd = ({active, over}: DragEndEvent) => {
    if (over) reorderCourses(categoryKey, String(active.id), String(over.id))
  }

  if (items.length === 0) {
    return (
      <EmptyState style={{minHeight: 120}}>
        <div>
          <p style={{marginBottom: 0}}>This category is ready for its first course.</p>
        </div>
      </EmptyState>
    )
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext
        items={items.map((item) => item._key)}
        strategy={verticalListSortingStrategy}
      >
        <CourseListContainer>
          {items.map((item) => {
            const imageUrl = getImageUrl(item.image?.asset?._ref, {
              dataset,
              projectId,
              width: 120,
            })

            return (
              <SortableCourse
                hidden={item.visible === false}
                id={item._key}
                key={item._key}
                label={item.name ?? 'course'}
              >
                {(dragHandle) => (
                  <>
                    {dragHandle}
                    <CourseOpenButton
                      onClick={() => openCourseEditor(categoryKey, item._key)}
                      type="button"
                    >
                      <CourseThumbnail>
                        {imageUrl ? <img alt="" src={imageUrl} /> : <ImageIcon />}
                      </CourseThumbnail>
                      <span>
                        <strong>{item.name || 'Untitled course'}</strong>
                        <small>{item.description || 'No description yet'}</small>
                      </span>
                      <CoursePrice>
                        {typeof item.price === 'number' ? `£${item.price.toFixed(2)}` : '—'}
                      </CoursePrice>
                    </CourseOpenButton>
                    <AvailabilityDot
                      $available={item.available !== false}
                      title={item.available === false ? 'Unavailable' : 'Available'}
                    />
                    <IconButton
                      aria-label={`${item.visible === false ? 'Show' : 'Hide'} ${item.name ?? 'course'} on the public menu`}
                      aria-pressed={item.visible !== false}
                      onClick={() => toggleCourseVisibility(categoryKey, item._key)}
                      title={item.visible === false ? 'Show on public menu' : 'Hide from public menu'}
                      type="button"
                    >
                      {item.visible === false ? <EyeOffIcon /> : <EyeIcon />}
                    </IconButton>
                    <IconButton
                      aria-label={`Edit ${item.name ?? 'course'}`}
                      onClick={() => openCourseEditor(categoryKey, item._key)}
                      type="button"
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </SortableCourse>
            )
          })}
        </CourseListContainer>
      </SortableContext>
    </DndContext>
  )
}
