export type SanityImage = {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
  alt?: string
}

export type MenuItem = {
  _key: string
  _type: 'menuItem'
  name?: string
  description?: string
  price?: number
  image?: SanityImage
  visible?: boolean
  available?: boolean
}

export type MenuCategory = {
  _key: string
  _type: 'category'
  name?: string
  description?: string
  visible?: boolean
  items?: MenuItem[]
}

export type MenuDocument = {
  _id: string
  _type: 'menu'
  _rev?: string
  _createdAt?: string
  _updatedAt?: string
  title: string
  categories?: MenuCategory[]
  hasUnpublishedChanges: boolean
}

export type CourseEditorTarget = {
  categoryKey: string
  itemKey?: string
}

export type SaveState = 'idle' | 'saving' | 'saved' | 'error'
export type PublishState = 'idle' | 'publishing' | 'published' | 'error'
