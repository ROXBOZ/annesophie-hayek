import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'keywordsSection',
  title: 'Section de mots clés',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'langString',
    }),
    defineField({
      name: 'keywords',
      title: 'Mots clés',
      type: 'array',
      of: [{type: 'langString'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Section de mots clés', // Hardcoded preview title
      }
    },
  },
})
