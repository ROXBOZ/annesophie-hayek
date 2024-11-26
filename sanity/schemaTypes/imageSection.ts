import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageSection',
  title: 'Section Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'langString',
      validation: (Rule: any) => Rule.required(),
    }),
    // defineField({
    //   name: 'legend',
    //   title: 'Légende',
    //   type: 'langString',
    // }),
  ],
  preview: {
    select: {
      title: 'alt.fr', // Select the 'fr' field from 'langString' (alt text)
      media: 'image', // Select the image field for the media
    },
    prepare(selection: {title: string; media: any}) {
      const {title, media} = selection

      return {
        title: title || 'No Alt Text', // Fallback to a default text if 'alt' is missing
        media: media, // Use the image object as the media in preview
      }
    },
  },
})
