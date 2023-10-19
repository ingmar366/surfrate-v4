import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structureBuilder'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'e-commerce',

  projectId: '85iwh34h',
  dataset: 'production',

  plugins: [deskTool({structure}), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
