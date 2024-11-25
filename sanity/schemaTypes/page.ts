import {defineField, defineType} from 'sanity'

import {langSlug} from './langSlug'
import {seo} from './seo'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'langString',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'langSlug',
      validation: (Rule: any) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Titre',
      type: 'langString',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'langText',
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [{type: 'textSection'}],
    }),

    // defineField({
    //   name: 'faqs',
    //   title: 'FAQs',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'faq'}]}],
    //   hidden: ({parent}) =>
    //     (parent && parent?.name?.fr === 'Foire aux questions') || parent?.name?.fr === 'FAQ',
    // }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [...seo],
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
