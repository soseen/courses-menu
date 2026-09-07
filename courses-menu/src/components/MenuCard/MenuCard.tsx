import type {MenuItem} from '../../sanity/types'
import {DishImage} from '../DishImage/DishImage'
import styles from './MenuCard.module.css'

const priceFormatter = new Intl.NumberFormat('en-GB', {
  currency: 'GBP',
  currencyDisplay: 'narrowSymbol',
  style: 'currency',
})

type MenuCardProps = {
  item: MenuItem
}

export function MenuCard({item}: MenuCardProps) {
  return (
    <article
      className={`card h-100 rounded-0 shadow-sm ${styles.card} ${item.available ? '' : 'opacity-75'}`}
    >
      <DishImage image={item.image} name={item.name} />
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex align-items-start justify-content-between gap-3">
          <h3 className="card-title h4 mb-0">{item.name}</h3>
          <span className="text-warning fw-semibold text-nowrap">
            {priceFormatter.format(item.price)}
          </span>
        </div>
        {item.description && <p className="card-text small text-body-secondary mt-2">{item.description}</p>}
        {!item.available && (
          <span className="small text-warning text-uppercase fw-semibold mt-auto pt-3">
            Currently unavailable
          </span>
        )}
      </div>
    </article>
  )
}
