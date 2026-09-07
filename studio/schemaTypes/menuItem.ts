import {defineField, defineType} from 'sanity'
import {ImageIcon} from '../menuStudio/icons'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Course',
  type: 'object',
  icon: ImageIcon,

  fields: [
    defineField({
      name: 'name',
      title: 'Course title',
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
      title: 'Price (GBP)',
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
            ? `£${price.toFixed(2)}`
            : undefined,
        media,
      }
    },
  },
})
