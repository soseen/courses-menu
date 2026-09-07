import { defineField, defineType } from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      price: 'price',
      media: 'image',
    },

    prepare({ title, price, media }) {
      return {
        title,
        subtitle:
          typeof price === 'number'
            ? `${price.toFixed(2)} zł`
            : undefined,
        media,
      }
    },
  },
})