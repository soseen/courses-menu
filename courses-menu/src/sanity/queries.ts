import {defineQuery} from 'groq'

export const MENUS_QUERY = defineQuery(/* groq */ `
  *[_type == "menu" && defined(title)] | order(_createdAt asc) {
    _id,
    title,
    categories[coalesce(visible, true)] {
      _key,
      name,
      description,
      items[coalesce(visible, true)] {
        _key,
        name,
        description,
        price,
        "available": coalesce(available, true),
        image {
          _type,
          alt,
          crop,
          hotspot,
          asset-> {
            _id,
            url,
            metadata {
              lqip,
              dimensions {width, height}
            }
          }
        }
      }
    }
  }
`)
