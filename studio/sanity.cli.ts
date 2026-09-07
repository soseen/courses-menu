import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'am93ag8m'
const appId = process.env.SANITY_DEPLOYMENT_APP_ID

export default defineCliConfig({
  api: {
    projectId,
    dataset: 'production',
  },
  deployment: {
    ...(appId ? {appId} : {}),
    autoUpdates: true,
  },
})
