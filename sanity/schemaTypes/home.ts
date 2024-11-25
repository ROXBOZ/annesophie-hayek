import {defineField, defineType} from 'sanity'

import {seo} from './seo'

export default defineType({
  name: 'home',
  title: 'Accueil',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'langString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'langString',
    }),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'langBlock',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [...seo],
    }),
  ],
  preview: {
    select: {
      name: 'title.fr',
    },
    prepare(selection: {name?: string}) {
      const {name = ''} = selection
      return {
        title: name,
      }
    },
  },
})
