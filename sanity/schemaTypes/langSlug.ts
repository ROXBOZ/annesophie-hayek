import {defineField} from 'sanity'

export const langSlug = {
  name: 'langSlug',
  title: 'Language Slug',
  type: 'object',
  fields: [
    defineField({
      name: 'fr',
      title: '🥐 FR',
      type: 'slug',
      options: {
        source: 'name.fr',
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD') // Normalize accents
            .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, '') // Remove special characters
            .replace(/-+/g, '-') // Collapse multiple hyphens
            .slice(0, 200),
      },
      validation: (Rule) => [
        Rule.required(),
        Rule.custom((slug) => {
          if (!slug?.current || /^[a-z0-9-]+$/.test(slug.current)) {
            return true
          }
          return 'Slug must contain only lowercase letters, numbers, and hyphens'
        }),
      ],
    }),
    defineField({
      name: 'en',
      title: '🥐 EN',
      type: 'slug',
      options: {
        source: 'name.en',
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD') // Normalize accents
            .replace(/[\u0300-\u036f]/g, '') // Remove accent marks
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/[^a-z0-9-]/g, '') // Remove special characters
            .replace(/-+/g, '-') // Collapse multiple hyphens
            .slice(0, 200),
      },
      validation: (Rule) => [
        Rule.required(),
        Rule.custom((slug) => {
          if (!slug?.current || /^[a-z0-9-]+$/.test(slug.current)) {
            return true
          }
          return 'Slug must contain only lowercase letters, numbers, and hyphens'
        }),
      ],
    }),
  ],
}
