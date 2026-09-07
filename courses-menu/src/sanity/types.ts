export type SanityImage = {
  _type?: 'image'
  alt?: string
  asset?: {
    _id: string
    url: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width: number
        height: number
      }
    }
  }
  crop?: {
    bottom: number
    left: number
    right: number
    top: number
  }
  hotspot?: {
    height: number
    width: number
    x: number
    y: number
  }
}

export type MenuItem = {
  _key: string
  name: string
  description?: string
  price: number
  image?: SanityImage
  available: boolean
}

export type MenuCategory = {
  _key: string
  name: string
  description?: string
  items: MenuItem[]
}

export type Menu = {
  _id: string
  title: string
  categories: MenuCategory[]
}
