import {defineField, defineType} from 'sanity'
import {QrCodeIcon} from '../menuStudio/icons'

export const menuSettings = defineType({
  name: 'menuSettings',
  title: 'Menu settings',
  type: 'document',
  icon: QrCodeIcon,
  fields: [
    defineField({
      name: 'publicUrl',
      title: 'Public menu URL',
      type: 'url',
      description: 'The page opened when a guest scans the menu QR code.',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['http', 'https']})
          .error('Enter a complete URL beginning with http:// or https://.'),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Menu settings'}),
  },
})
