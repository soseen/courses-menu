import {useState} from 'react'
import {useMenus} from '../../hooks/useMenus'
import {MenuNavigation} from '../MenuNavigation/MenuNavigation'
import {MenuSection} from '../MenuSection/MenuSection'
import styles from './MenuApp.module.css'

export function MenuApp() {
  const {error, loading, menus, reload} = useMenus()
  const [requestedMenuId, setRequestedMenuId] = useState<string>()
  const activeMenu = menus.find((menu) => menu._id === requestedMenuId) ?? menus[0]

  return (
    <div className="d-flex flex-column min-vh-100 overflow-hidden" id="top">
      <main className="flex-grow-1">
        <section className="container text-center py-5 my-lg-3" id="our-kitchen">
          <h1 className={`${styles.title} display-1 mx-auto mb-4`}>
            {activeMenu?.title || 'Our menus'}
          </h1>
          <p className={`${styles.introduction} lead text-body-secondary mx-auto mb-0`}>
            Food made with the best of the season, served simply and meant to be shared.
          </p>
        </section>

        <div className="container-xl pb-5" id="menus">
          {loading && (
            <div
              className={`${styles.state} d-flex align-items-center justify-content-center gap-3 py-5 my-5`}
            >
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
              Loading today’s menus
            </div>
          )}

          {error && (
            <div
              className={`${styles.state} alert alert-light border rounded-0 d-flex flex-wrap align-items-center justify-content-between gap-3 mx-auto`}
            >
              <span>{error}</span>
              <button className="btn btn-outline-primary btn-sm" onClick={reload} type="button">
                Try again
              </button>
            </div>
          )}

          {!loading && !error && activeMenu && (
            <>
              <MenuNavigation
                activeMenuId={activeMenu._id}
                menus={menus}
                onChange={setRequestedMenuId}
              />

              {activeMenu.categories.length ? (
                <div className="pb-5" key={activeMenu._id}>
                  {activeMenu.categories.map((category) => (
                    <MenuSection category={category} key={category._key} />
                  ))}
                </div>
              ) : (
                <div className={`${styles.state} border-top border-bottom text-center py-5 mx-auto`}>
                  <h2>This menu is being prepared</h2>
                  <p className="text-body-secondary mb-0 mt-3">
                    Please check back soon for our latest dishes.
                  </p>
                </div>
              )}
            </>
          )}

          {!loading && !error && menus.length === 0 && (
            <div className={`${styles.state} border-top border-bottom text-center py-5 mx-auto`}>
              <h2>No menus are published yet</h2>
              <p className="text-body-secondary mb-0 mt-3">
                Publish a menu in Sanity Studio and it will appear here.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer aria-hidden="true" className="bg-secondary mt-auto py-5" />
    </div>
  )
}
