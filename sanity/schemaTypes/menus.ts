import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menus',
  title: 'Menus',
  type: 'document',
  fields: [
    defineField({
      name: 'headerMenu',
      title: 'Menu Header',
      type: 'array',
      of: [
        defineField({
          name: 'headerMenuEntry',
          title: 'Entrée',
          type: 'reference',
          to: [{type: 'page'}],
        }),
      ],
    }),
    defineField({
      name: 'footerMenu',
      title: 'Menu Footer',
      type: 'array',
      of: [
        defineField({
          name: 'footerMenuEntry',
          title: 'Entrée',
          type: 'reference',
          to: [{type: 'page'}],
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      const title = 'Menus'
      return {
        title: title,
      }
    },
  },
})
