import {defineArrayMember, defineField, defineType} from 'sanity'
import {MenuIcon} from '../menuStudio/icons'

export const menu = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: MenuIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Menu title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'category'})],
    }),
  ],
})
