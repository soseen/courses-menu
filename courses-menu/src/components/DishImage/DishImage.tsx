import {imageUrl} from '../../sanity/image'
import type {SanityImage} from '../../sanity/types'
import {BrandMark} from '../BrandMark/BrandMark'
import styles from './DishImage.module.css'

type DishImageProps = {
  image?: SanityImage
  name: string
}

export function DishImage({image, name}: DishImageProps) {
  if (!image?.asset) {
    return (
      <div
        className={`${styles.frame} ${styles.placeholder} d-flex flex-column align-items-center justify-content-center gap-3 bg-secondary`}
      >
        <BrandMark />
        <span className="small fw-semibold text-uppercase">Image coming soon</span>
      </div>
    )
  }

  const imageSource = image as Parameters<typeof imageUrl>[0]
  const lqip = image.asset.metadata?.lqip

  return (
    <div
      className={`${styles.frame} position-relative overflow-hidden bg-secondary`}
      style={lqip ? {backgroundImage: `url(${lqip})`} : undefined}
    >
      <img
        alt={image.alt || name}
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        loading="lazy"
        sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
        src={imageUrl(imageSource, 720, 500)}
        srcSet={`${imageUrl(imageSource, 480, 334)} 480w, ${imageUrl(imageSource, 720, 500)} 720w`}
      />
    </div>
  )
}
