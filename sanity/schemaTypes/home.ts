import {defineField, defineType} from 'sanity'

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
      name: 'video',
      title: 'Video',
      type: 'file',
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
