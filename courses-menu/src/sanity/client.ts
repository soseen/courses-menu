import {createClient} from '@sanity/client'

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'am93ag8m'
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  apiVersion: '2026-09-01',
  dataset,
  perspective: 'published',
  projectId,
  useCdn: true,
})
