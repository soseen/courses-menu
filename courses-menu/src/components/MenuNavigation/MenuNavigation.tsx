import type {Menu} from '../../sanity/types'
import styles from './MenuNavigation.module.css'

type MenuNavigationProps = {
  activeMenuId: string
  menus: Menu[]
  onChange: (menuId: string) => void
}

export function MenuNavigation({activeMenuId, menus, onChange}: MenuNavigationProps) {
  if (menus.length < 2) return null

  return (
    <div
      className={`${styles.switcher} d-flex flex-wrap justify-content-center gap-2 border-bottom pb-4 mb-5`}
      role="tablist"
      aria-label="Menus"
    >
      {menus.map((menu) => {
        const isActive = menu._id === activeMenuId

        return (
          <button
            aria-selected={isActive}
            className={`btn rounded-pill px-4 ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}
            key={menu._id}
            onClick={() => onChange(menu._id)}
            role="tab"
            type="button"
          >
            {menu.title}
          </button>
        )
      })}
    </div>
  )
}
