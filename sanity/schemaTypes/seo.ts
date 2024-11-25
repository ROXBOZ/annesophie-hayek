import {defineField} from 'sanity'

export const seo = [
  defineField({
    name: 'pageTitle',
    title: 'Page Title',
    type: 'langString',
    description:
      'Le titre de la page apparaîtra dans les résultats de recherche et les partages sur les réseaux sociaux.',
  }),
  defineField({
    name: 'metaDescription',
    title: 'Meta Description',
    type: 'langText',
    description:
      'La méta-description apparaîtra dans les résultats de recherche et les partages sur les réseaux sociaux.',
  }),
]
