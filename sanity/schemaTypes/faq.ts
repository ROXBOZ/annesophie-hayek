import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'langString',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Réponse',
      type: 'langBlock',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question.fr',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'No Title',
      }
    },
  },
})
