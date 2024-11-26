import {defineConfig} from 'sanity'
import {schemaTypes} from './schemaTypes'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'annesophie-hayek',

  projectId: 'rgci878b',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Profile')
              .id('userProfile')
              .child(S.document().schemaType('userProfile').documentId('userProfile'))
              .icon(() => '👩'),
            S.listItem()
              .title('Menus')
              .id('menus')
              .child(S.document().schemaType('menus').documentId('menus'))
              .icon(() => '✨'),
            S.listItem()
              .title('Accueil')
              .id('home')
              .child(S.document().schemaType('home').documentId('home'))
              .icon(() => '🏠'),
            S.documentTypeListItem('page')
              .title('Pages')
              .icon(() => '📄'),
            S.documentTypeListItem('faq')
              .title('Faqs')
              .icon(() => '🤔'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
