import {defineField, defineType} from 'sanity'

import {seo} from './seo'

export default defineType({
  name: 'home',
  title: 'Accueil',
  type: 'document',
  groups: [
    {
      name: 'text',
      title: 'Layout',
    },
    {
      name: 'media',
      title: 'Médias',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'langString',
      group: 'text',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'langString',
      group: 'text',
    }),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'langBlock',
      group: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      readOnly: true,
      group: 'media',
    }),
    defineField({
      name: 'audio',
      title: 'Audio',
      type: 'file',
      readOnly: true,
      group: 'media',
    }),
    defineField({
      name: 'audioDescription',
      title: 'Audio Description',
      type: 'langBlock',
      group: 'media',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [...seo],
      group: 'seo',
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
