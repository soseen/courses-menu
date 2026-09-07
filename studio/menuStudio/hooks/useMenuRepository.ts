import {useCallback, useEffect, useRef, useState} from 'react'
import type {SanityClient} from 'sanity'
import {MENU_QUERY, SAVE_DELAY_MS} from '../constants'
import type {MenuDocument, SaveState} from '../types'

type MenuUpdater = (menu: MenuDocument) => MenuDocument
type MenuDocumentFields = Pick<MenuDocument, '_type' | 'categories' | 'title'>

export function useMenuRepository(client: SanityClient) {
  const [menus, setMenus] = useState<MenuDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const menusRef = useRef<MenuDocument[]>([])
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingMenuRef = useRef<MenuDocument | undefined>(undefined)

  const replaceMenus = useCallback((nextMenus: MenuDocument[]) => {
    menusRef.current = nextMenus
    setMenus(nextMenus)
  }, [])

  const clearError = useCallback(() => setError(undefined), [])

  const persistNow = useCallback(
    async (menu: MenuDocument) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = null
      if (pendingMenuRef.current === menu) pendingMenuRef.current = undefined
      setSaveState('saving')
      setError(undefined)

      try {
        const result = await client
          .patch(menu._id)
          .set({title: menu.title.trim(), categories: menu.categories ?? []})
          .commit()
        const nextMenus = menusRef.current.map((candidate) =>
          candidate._id === menu._id ? {...candidate, _rev: result._rev} : candidate,
        )
        replaceMenus(nextMenus)
        if (!pendingMenuRef.current) setSaveState('saved')
      } catch (saveError) {
        setSaveState('error')
        setError(
          saveError instanceof Error ? saveError.message : 'Your changes could not be saved.',
        )
      }
    },
    [client, replaceMenus],
  )

  const scheduleSave = useCallback(
    (menu: MenuDocument) => {
      pendingMenuRef.current = menu
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      setSaveState('saving')
      saveTimerRef.current = setTimeout(() => void persistNow(menu), SAVE_DELAY_MS)
    },
    [persistNow],
  )

  const updateMenu = useCallback(
    (menuId: string, updater: MenuUpdater) => {
      const currentMenu = menusRef.current.find((menu) => menu._id === menuId)
      if (!currentMenu) return

      const nextMenu = updater(currentMenu)
      const nextMenus = menusRef.current.map((menu) => (menu._id === menuId ? nextMenu : menu))
      replaceMenus(nextMenus)
      scheduleSave(nextMenu)
    },
    [replaceMenus, scheduleSave],
  )

  const flushPendingSave = useCallback(() => {
    if (pendingMenuRef.current) void persistNow(pendingMenuRef.current)
  }, [persistNow])

  const createMenu = useCallback(
    async (title: string) => {
      setError(undefined)
      try {
        const created = await client.create<MenuDocumentFields>({
          _type: 'menu',
          title,
          categories: [],
        })
        replaceMenus([...menusRef.current, created])
        setSaveState('saved')
        return created
      } catch (createError) {
        setError(
          createError instanceof Error ? createError.message : 'The menu could not be created.',
        )
        return undefined
      }
    },
    [client, replaceMenus],
  )

  const deleteMenu = useCallback(
    async (menuId: string) => {
      if (pendingMenuRef.current?._id === menuId) {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
        saveTimerRef.current = null
        pendingMenuRef.current = undefined
      }

      setError(undefined)
      try {
        await client.delete(menuId)
        replaceMenus(menusRef.current.filter((menu) => menu._id !== menuId))
        setSaveState('idle')
        return true
      } catch (deleteError) {
        setError(
          deleteError instanceof Error ? deleteError.message : 'The menu could not be removed.',
        )
        return false
      }
    },
    [client, replaceMenus],
  )

  useEffect(() => {
    let active = true

    client
      .fetch<MenuDocument[]>(MENU_QUERY)
      .then((documents) => {
        if (active) replaceMenus(documents)
      })
      .catch((fetchError: unknown) => {
        if (!active) return
        setError(fetchError instanceof Error ? fetchError.message : 'Menus could not be loaded.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)

      const pendingMenu = pendingMenuRef.current
      if (pendingMenu) {
        void client
          .patch(pendingMenu._id)
          .set({title: pendingMenu.title.trim(), categories: pendingMenu.categories ?? []})
          .commit()
      }
    }
  }, [client, replaceMenus])

  return {
    clearError,
    createMenu,
    deleteMenu,
    error,
    flushPendingSave,
    loading,
    menus,
    saveState,
    updateMenu,
  }
}
