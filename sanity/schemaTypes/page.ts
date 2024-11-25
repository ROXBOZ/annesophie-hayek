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
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'langSlug',
    }),

    defineField({
      name: 'title',
      title: 'Titre',
      type: 'langString',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'langText',
    }),
    // defineField({
    //   name: 'content',
    //   title: 'Contenu (texte en bandeau)',
    //   type: 'array',
    //   of: [{type: 'paragraph'}, {type: 'iframe'}],
    //   hidden: ({parent}) => parent && parent?.name?.fr !== 'CGV' && parent?.name?.fr !== 'À propos',
    // }),

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
