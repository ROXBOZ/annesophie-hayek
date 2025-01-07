import {defineField, defineType} from 'sanity'

import {langSlug} from './langSlug'
import {seo} from './seo'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {
      name: 'text',
      title: 'Layout',
    },
    {
      name: 'content',
      title: 'Contenu',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'langString',
      group: 'text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'langSlug',
      group: 'text',
      validation: (Rule: any) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Titre',
      type: 'langString',
      group: 'text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'langText',
      group: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      group: 'content',
      of: [
        {type: 'textSection'},
        {type: 'linkButton'},
        {type: 'imageSection'},
        {type: 'keywordsSection'},
      ],
      hidden: ({parent}) => parent?.name?.fr === 'faq' || parent?.name?.fr === 'FAQ',
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
      name: 'name.fr',
    },
    prepare(selection: {name?: string}) {
      const {name = ''} = selection
      return {
        title: name,
      }
    },
  },
})
