import type {SaveState} from './types'

type ImageUrlOptions = {
  dataset: string
  projectId: string
  width?: number
}

export function createKey() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `item-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getCourseCountLabel(count: number) {
  return `${count} ${count === 1 ? 'course' : 'courses'}`
}

export function getImageUrl(
  reference: string | undefined,
  {dataset, projectId, width = 900}: ImageUrlOptions,
) {
  if (!reference) return undefined

  const [, assetId, dimensions, extension] = reference.split('-')
  if (!assetId || !dimensions || !extension) return undefined

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${extension}?w=${width}&fit=max&auto=format`
}

export function getSaveStatusLabel(saveState: SaveState) {
  switch (saveState) {
    case 'saving':
      return 'Saving draft…'
    case 'saved':
      return 'Draft saved'
    case 'error':
      return 'Save failed'
    default:
      return ''
  }
}
