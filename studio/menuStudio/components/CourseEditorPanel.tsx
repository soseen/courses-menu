import {useEffect, useState} from 'react'
import type {ChangeEvent, FormEvent} from 'react'
import {useMenuStudio} from '../context/useMenuStudio'
import {ArrowIcon, CloseIcon, ImageIcon} from '../icons'
import {
  ErrorBanner,
  Field,
  FieldStack,
  IconButton,
  ImageActions,
  ImageDrop,
  Overlay,
  PanelFooter,
  PanelHeader,
  PrimaryButton,
  SidePanel,
  TextButton,
  ToggleLabel,
  TwoColumns,
} from '../styles'
import type {MenuCategory, MenuItem} from '../types'
import {createKey, getImageUrl} from '../utils'

type CourseEditorFormProps = {
  category: MenuCategory
  item?: MenuItem
}

function createCourseDraft(item?: MenuItem): MenuItem {
  return (
    item ?? {
      _key: createKey(),
      _type: 'menuItem',
      name: '',
      description: '',
      visible: true,
      available: true,
    }
  )
}

function CourseEditorForm({category, item}: CourseEditorFormProps) {
  const {client, closeCourseEditor, dataset, deleteCourse, projectId, saveCourse} = useMenuStudio()
  const [draft, setDraft] = useState<MenuItem>(() => createCourseDraft(item))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string>()
  const imageUrl = getImageUrl(draft.image?.asset?._ref, {dataset, projectId})

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCourseEditor()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [closeCourseEditor])

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(undefined)
    try {
      const asset = await client.assets.upload('image', file, {filename: file.name})
      setDraft((current) => ({
        ...current,
        image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      }))
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : 'The image could not be uploaded.',
      )
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const name = draft.name?.trim()
    if (!name) {
      setError('Add a title before saving this course.')
      return
    }
    if (draft.price === undefined || Number.isNaN(draft.price) || draft.price < 0) {
      setError('Add a valid price before saving this course.')
      return
    }

    setError(undefined)
    saveCourse({...draft, name})
  }

  return (
    <Overlay
      aria-label={item ? `Edit ${item.name ?? 'course'}` : 'Add a new course'}
      aria-modal="true"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) closeCourseEditor()
      }}
      role="dialog"
    >
      <SidePanel as="form" onMouseDown={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
        <PanelHeader>
          <div>
            <small>{category.name ?? 'Category'}</small>
            <h2>{item ? 'Edit course' : 'New course'}</h2>
          </div>
          <IconButton aria-label="Close course editor" onClick={closeCourseEditor} type="button">
            <CloseIcon />
          </IconButton>
        </PanelHeader>

        {error && <ErrorBanner>{error}</ErrorBanner>}

        <FieldStack>
          <Field>
            Course title
            <input
              autoFocus
              onChange={(event) => setDraft((current) => ({...current, name: event.target.value}))}
              placeholder="e.g. Roasted heritage carrots"
              type="text"
              value={draft.name ?? ''}
            />
          </Field>

          <Field>
            Description
            <textarea
              onChange={(event) =>
                setDraft((current) => ({...current, description: event.target.value}))
              }
              placeholder="Ingredients, preparation, allergens…"
              value={draft.description ?? ''}
            />
          </Field>

          <TwoColumns>
            <Field>
              Price (GBP)
              <input
                min="0"
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    price: event.target.value === '' ? undefined : Number(event.target.value),
                  }))
                }
                placeholder="0.00"
                step="0.01"
                type="number"
                value={draft.price ?? ''}
              />
            </Field>

            <Field as="div">
              Availability
              <ToggleLabel style={{minHeight: 44}}>
                <input
                  checked={draft.available !== false}
                  onChange={(event) =>
                    setDraft((current) => ({...current, available: event.target.checked}))
                  }
                  type="checkbox"
                />
                <span />
                <em>{draft.available === false ? 'Unavailable' : 'Available'}</em>
              </ToggleLabel>
            </Field>
          </TwoColumns>

          <Field as="div">
            Course image
            <ImageDrop>
              <input accept="image/*" disabled={uploading} onChange={handleImage} type="file" />
              {imageUrl && <img alt="Course preview" src={imageUrl} />}
              <div>
                <ImageIcon />
                {uploading ? 'Uploading…' : imageUrl ? 'Replace image' : 'Choose image'}
              </div>
            </ImageDrop>
            {draft.image && (
              <>
                <Field style={{marginTop: 12}}>
                  Image description
                  <input
                    onChange={(event) =>
                      setDraft((current) =>
                        current.image
                          ? {...current, image: {...current.image, alt: event.target.value}}
                          : current,
                      )
                    }
                    placeholder="e.g. Roasted carrots with herb dressing"
                    type="text"
                    value={draft.image.alt ?? ''}
                  />
                </Field>
                <ImageActions>
                  <TextButton
                    $danger
                    onClick={() => setDraft((current) => ({...current, image: undefined}))}
                    type="button"
                  >
                    Remove image
                  </TextButton>
                </ImageActions>
              </>
            )}
          </Field>
        </FieldStack>

        <PanelFooter>
          {item ? (
            <TextButton $danger onClick={deleteCourse} type="button">
              Delete course
            </TextButton>
          ) : (
            <span />
          )}
          <PrimaryButton disabled={uploading} type="submit">
            Save course <ArrowIcon />
          </PrimaryButton>
        </PanelFooter>
      </SidePanel>
    </Overlay>
  )
}

export function CourseEditorPanel() {
  const {editor, editorCategory, editorItem} = useMenuStudio()
  if (!editor || !editorCategory) return null

  return (
    <CourseEditorForm
      category={editorCategory}
      item={editorItem}
      key={`${editor.categoryKey}-${editor.itemKey ?? 'new'}`}
    />
  )
}
