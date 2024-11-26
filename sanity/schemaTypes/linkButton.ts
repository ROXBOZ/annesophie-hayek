import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'linkButton',
  title: 'Lien Bouton',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'langString',
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Email', value: 'email'},
          {title: 'URL', value: 'url'},
        ],
      },
    }),

    defineField({
      name: 'href',
      title: 'href',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      hidden: ({parent}) => parent?.type !== 'url',
    }),
    defineField({
      name: 'level',
      title: 'Niveau',
      type: 'string',
      options: {
        list: [
          {title: 'Primaire', value: 'primary'},
          {title: 'Secondaire', value: 'secondary'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'label.fr', // Select the 'fr' field from the 'langString'
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'No Title', // Ensure a fallback if 'title' is empty
      }
    },
  },
})
