import {defineField} from 'sanity'

export const langText = {
  name: 'langText',
  title: 'Language Text',
  type: 'object',
  fields: [
    defineField({
      name: 'fr',
      title: '🥐 FR',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'en',
      title: '🌭 EN',
      type: 'text',
      rows: 6,
    }),
  ],
}
