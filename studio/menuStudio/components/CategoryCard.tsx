import {useMenuStudio} from '../context/useMenuStudio'
import {ArrowDownIcon, ArrowUpIcon, ChevronIcon, CloseIcon, PlusIcon} from '../icons'
import {
  AccordionButton,
  CategoryBody,
  CategoryCard as CategoryCardContainer,
  CategoryDescription,
  CategoryHeader,
  CategoryMeta,
  CategoryMoveControls,
  CategorySummary,
  CoursesHeader,
  IconButton,
  MoveButton,
  OutlineButton,
  ToggleLabel,
} from '../styles'
import type {MenuCategory} from '../types'
import {getCourseCountLabel} from '../utils'
import {CourseList} from './CourseList'
import {InlineNameEditor} from './InlineNameEditor'

type CategoryCardProps = {
  category: MenuCategory
  categoryCount: number
  expanded: boolean
  index: number
  onToggle: () => void
}

export function CategoryCard({
  category,
  categoryCount,
  expanded,
  index,
  onToggle,
}: CategoryCardProps) {
  const {moveCategory, openCourseEditor, removeCategory, updateCategory} = useMenuStudio()
  const items = category.items ?? []
  const categoryName = category.name ?? 'category'

  return (
    <CategoryCardContainer>
      <CategoryHeader>
        <CategoryMoveControls>
          <MoveButton
            aria-label={`Move ${categoryName} up`}
            disabled={index === 0}
            onClick={() => moveCategory(category._key, -1)}
            title="Move category up"
            type="button"
          >
            <ArrowUpIcon />
          </MoveButton>
          <MoveButton
            aria-label={`Move ${categoryName} down`}
            disabled={index === categoryCount - 1}
            onClick={() => moveCategory(category._key, 1)}
            title="Move category down"
            type="button"
          >
            <ArrowDownIcon />
          </MoveButton>
        </CategoryMoveControls>
        <AccordionButton
          $expanded={expanded}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${categoryName}`}
          onClick={onToggle}
          type="button"
        >
          <ChevronIcon />
        </AccordionButton>
        <CategorySummary>
          <InlineNameEditor
            label="Category name"
            onSave={(name) => updateCategory(category._key, (current) => ({...current, name}))}
            value={category.name ?? 'Untitled category'}
          />
          <CategoryMeta>{getCourseCountLabel(items.length)}</CategoryMeta>
        </CategorySummary>
        <ToggleLabel>
          <input
            checked={category.visible !== false}
            onChange={(event) =>
              updateCategory(category._key, (current) => ({
                ...current,
                visible: event.target.checked,
              }))
            }
            type="checkbox"
          />
          <span />
          <em>{category.visible === false ? 'Hidden' : 'Visible'}</em>
        </ToggleLabel>
        <IconButton
          $danger
          aria-label={`Delete ${categoryName}`}
          onClick={() => removeCategory(category)}
          title="Delete category"
          type="button"
        >
          <CloseIcon />
        </IconButton>
      </CategoryHeader>

      {expanded && (
        <CategoryBody>
          <CategoryDescription
            aria-label={`${category.name ?? 'Category'} description`}
            onChange={(event) =>
              updateCategory(category._key, (current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            placeholder="Optional category description"
            value={category.description ?? ''}
          />
          <CoursesHeader>
            <h3>Courses</h3>
            <OutlineButton $compact onClick={() => openCourseEditor(category._key)} type="button">
              <PlusIcon /> Add course
            </OutlineButton>
          </CoursesHeader>

          <CourseList categoryKey={category._key} items={items} />
        </CategoryBody>
      )}
    </CategoryCardContainer>
  )
}
