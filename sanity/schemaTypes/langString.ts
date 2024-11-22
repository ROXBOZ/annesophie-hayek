import {defineField} from 'sanity'

export const langString = {
  name: 'langString',
  title: 'Language String',
  type: 'object',
  fields: [
    defineField({
      name: 'fr',
      title: '🥐 FR',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: '🌭 EN',
      type: 'string',
    }),
  ],
}
