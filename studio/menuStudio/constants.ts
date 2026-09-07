export const MENU_API_VERSION = '2026-09-01'
export const MAX_MENUS = 3
export const SAVE_DELAY_MS = 700

export const MENU_QUERY = `*[_type == "menu"] | order(_createdAt asc) {
  _id,
  _type,
  _rev,
  _createdAt,
  _updatedAt,
  title,
  categories[]{
    _key,
    _type,
    name,
    description,
    visible,
    items[]{
      _key,
      _type,
      name,
      description,
      price,
      image,
      visible,
      available
    }
  }
}`
