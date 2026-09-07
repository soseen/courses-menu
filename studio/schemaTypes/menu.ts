import { defineField, defineType } from 'sanity'

export const menu = defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',

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
      of: [
        {
          type: 'category',
        },
      ],
    }),
  ],
})