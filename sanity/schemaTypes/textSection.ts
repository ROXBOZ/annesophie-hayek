import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textSection',
  title: 'Section Texte',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'langString',
    }),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'langBlock',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'isBannered',
      title: 'Est en bannière',
      type: 'boolean',
      validation: (Rule: any) => Rule.required(),
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title.fr', // Select the 'fr' field from 'langString'
      content: 'text.fr', // Select the 'fr' field from 'langBlock'
    },
    prepare(selection: {title: string; content: any[]}) {
      const {title, content} = selection

      // If title exists, use it, otherwise fall back to content
      const plainText = content
        ? content
            .filter((block: any) => block._type === 'block' && block.children) // Filter for text blocks
            .map((block: any) => block.children.map((child: any) => child.text).join('')) // Extract text
            .join(' ') // Combine into a single string
        : 'Texte non défini' // Fallback if no content exists

      return {
        title: title || plainText, // Display title if available, otherwise fallback to plainText
      }
    },
  },
})
