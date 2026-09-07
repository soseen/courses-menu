import {useEffect, useState} from 'react'
import {EditIcon} from '../icons'
import {EditableName, NameInput, NameText, PencilButton} from '../styles'

type InlineNameEditorProps = {
  label: string
  menu?: boolean
  onSave: (value: string) => void
  value: string
}

export function InlineNameEditor({label, menu, onSave, value}: InlineNameEditorProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  useEffect(() => {
    if (!editing) setDraft(value)
  }, [editing, value])

  const finishEditing = () => {
    const nextValue = draft.trim()
    if (nextValue && nextValue !== value) onSave(nextValue)
    else setDraft(value)
    setEditing(false)
  }

  return (
    <EditableName>
      {editing ? (
        <NameInput
          $menu={menu}
          aria-label={label}
          autoFocus
          onBlur={finishEditing}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.currentTarget.blur()
            if (event.key === 'Escape') {
              setDraft(value)
              setEditing(false)
            }
          }}
          value={draft}
        />
      ) : (
        <NameText $menu={menu}>{value || 'Untitled'}</NameText>
      )}
      {!editing && (
        <PencilButton
          aria-label={`Edit ${label.toLowerCase()}`}
          onClick={() => setEditing(true)}
          title={`Edit ${label.toLowerCase()}`}
          type="button"
        >
          <EditIcon />
        </PencilButton>
      )}
    </EditableName>
  )
}
