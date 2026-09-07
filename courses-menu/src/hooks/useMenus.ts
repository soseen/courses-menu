import {useCallback, useEffect, useState} from 'react'
import {sanityClient} from '../sanity/client'
import {MENUS_QUERY} from '../sanity/queries'
import type {Menu} from '../sanity/types'

type MenuState = {
  menus: Menu[]
  error?: string
  loading: boolean
}

export function useMenus() {
  const [request, setRequest] = useState(0)
  const [state, setState] = useState<MenuState>({menus: [], loading: true})

  const reload = useCallback(() => {
    setState((current) => ({...current, error: undefined, loading: true}))
    setRequest((current) => current + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    sanityClient
      .fetch<Menu[]>(MENUS_QUERY, {}, {signal: controller.signal})
      .then((menus) => {
        setState({
          menus: menus.map((menu) => ({
            ...menu,
            categories: (menu.categories ?? []).filter((category) => category.items?.length),
          })),
          loading: false,
        })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          menus: [],
          loading: false,
          error: error instanceof Error ? error.message : 'The menus could not be loaded.',
        })
      })

    return () => controller.abort()
  }, [request])

  return {...state, reload}
}
