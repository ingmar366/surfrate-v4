import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {structure} from './structureBuilder'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'surfrate',

  projectId: 'w42b1yes',
  dataset: 'default',

  plugins: [deskTool({structure}), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
