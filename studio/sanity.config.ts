import {defineConfig} from 'sanity'
import {schemaTypes} from './schemaTypes'
import {menuStudioTheme} from './theme'
import {MenuStudio} from './menuStudio/MenuStudio'
import {MenuIcon} from './menuStudio/icons'

export default defineConfig({
  name: 'default',
  title: 'Courses Menu',

  projectId: 'am93ag8m',
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
