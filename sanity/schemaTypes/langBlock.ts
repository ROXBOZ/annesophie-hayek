import {defineField} from 'sanity'

export const langBlock = {
  name: 'langBlock',
  title: 'Block de texte',
  type: 'object',

  fields: [
    defineField({
      name: 'fr',
      title: '🥐 FR',
      type: 'blockContent',
    }),
    defineField({
      name: 'en',
      title: '🌭 EN',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Texte',
      }
    },
  },
}
