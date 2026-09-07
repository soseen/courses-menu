import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'object',

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
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'menuItem',
        },
      ],
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
        subtitle: `${items?.length ?? 0} items`,
      }
    },
  },
})