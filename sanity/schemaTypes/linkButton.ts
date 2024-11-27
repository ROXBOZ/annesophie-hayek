import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'linkButton',
  title: 'Lien Bouton',
  type: 'document',
  // validation: (Rule) => Rule.length(2).error('You can only add 2 items'),

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'langString',
    }),
    defineField({
      name: 'buttons',
      title: 'Bouton(s)',
      type: 'array',
      of: [
        defineField({
          name: 'button',
          title: 'Bouton',
          type: 'object',
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
                  {title: 'Téléphone', value: 'tel'},
                ],
              },
            }),

            defineField({
              name: 'href',
              title: 'href',
              type: 'string',
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
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr', // Select the 'fr' field from the 'langString'
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Bouton(s)', // Ensure a fallback if 'title' is empty
      }
    },
  },
})
