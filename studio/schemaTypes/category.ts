import {defineArrayMember, defineField, defineType} from 'sanity'
import {MenuIcon} from '../menuStudio/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'object',
  icon: MenuIcon,

  fields: [
    defineField({
      name: 'name',
      title: 'Category name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'visible',
      title: 'Visible',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'items',
      title: 'Courses',
      type: 'array',
      of: [defineArrayMember({type: 'menuItem'})],
    }),
  ],

  preview: {
    select: {
      title: 'name',
      items: 'items',
    },

    prepare({ title, items }) {
      return {
        title,
        subtitle: `${items?.length ?? 0} courses`,
      }
    },
  },
})
