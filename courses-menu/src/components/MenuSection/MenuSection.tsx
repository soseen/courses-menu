import type {MenuCategory} from '../../sanity/types'
import {MenuCard} from '../MenuCard/MenuCard'
import styles from './MenuSection.module.css'

type MenuSectionProps = {
  category: MenuCategory
}

export function MenuSection({category}: MenuSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={`category-${category._key}`}>
      <div className="border-bottom pb-3 mb-4">
        <h2 className="display-5 mb-0" id={`category-${category._key}`}>
          {category.name}
        </h2>
        {category.description && (
          <p className="small text-body-secondary lh-lg mt-2 mb-0">{category.description}</p>
        )}
      </div>

      <div className="row g-4">
        {category.items.map((item) => (
          <div className="col-md-6 col-xl-4" key={item._key}>
            <MenuCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}
