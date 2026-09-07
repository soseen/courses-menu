import {createImageUrlBuilder} from '@sanity/image-url'
import {sanityClient} from './client'

const builder = createImageUrlBuilder(sanityClient)

export function imageUrl(source: Parameters<typeof builder.image>[0], width: number, height: number) {
  return builder.image(source).width(width).height(height).fit('crop').auto('format').quality(84).url()
}
