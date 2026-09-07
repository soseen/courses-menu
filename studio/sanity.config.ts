import {defineConfig} from 'sanity'
import {schemaTypes} from './schemaTypes'
import {menuStudioTheme} from './theme'
import {MenuStudio} from './menuStudio/MenuStudio'
import {MenuIcon} from './menuStudio/icons'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'am93ag8m'

export default defineConfig({
  name: 'default',
  title: 'Courses Menu',

  projectId,
  dataset: 'production',

  theme: menuStudioTheme,

  tools: [
    {
      name: 'menus',
      title: 'Menus',
      icon: MenuIcon,
      component: MenuStudio,
    },
  ],

  schema: {
    types: schemaTypes,
  },
})
