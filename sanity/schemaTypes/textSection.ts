import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'textSection',
  title: 'Section Texte',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'langBlock',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      content: 'text.fr', // Select the portable text field
    },
    prepare(selection: {content: any[]}) {
      const content = selection.content || [] // Ensure it defaults to an empty array
      const plainText = content
        .filter((block) => block._type === 'block' && block.children) // Filter for text blocks
        .map((block) => block.children.map((child: any) => child.text).join('')) // Extract text
        .join(' ') // Combine into a single string

      return {
        title: plainText || 'Texte non défini', // Provide a fallback if no text
      }
    },
  },
})
