import {defineField, defineType} from 'sanity'

const swissPhoneNumberRegex = /^(\+41|0041|0)([1-9][0-9])([0-9]{3})([0-9]{2})([0-9]{2})$/

export default defineType({
  name: 'userProfile',
  title: 'Anne-Sophie Hayek',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'titles',
      title: 'Titres',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'telephone',
          title: 'Téléphone',
          type: 'string',
          description:
            'Le numéro de téléphone doit être un numéro suisse valide, comme +41XXYYYZZZZ ou 0041XXYYYZZZZ.',
          validation: (Rule) =>
            Rule.regex(swissPhoneNumberRegex).error(
              'Le numéro de téléphone doit être un numéro suisse valide, comme +41XXYYYZZZZ ou 0041XXYYYZZZZ.',
            ),
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (Rule) => Rule.email().error('Veuillez entrer une adresse email valide.'),
        }),
      ],
    }),
  ],
})