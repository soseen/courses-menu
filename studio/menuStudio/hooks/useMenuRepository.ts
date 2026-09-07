import {useCallback, useEffect, useRef, useState} from 'react'
import type {SanityClient} from 'sanity'
import {MENU_QUERY, SAVE_DELAY_MS} from '../constants'
import type {MenuDocument, PublishState, SaveState} from '../types'

type MenuUpdater = (menu: MenuDocument) => MenuDocument
type MenuDocumentFields = Pick<MenuDocument, '_type' | 'categories' | 'title'>

const getPublishedId = (id: string) => id.replace(/^drafts\./, '')
const getDraftId = (id: string) => `drafts.${getPublishedId(id)}`

function mergeDocumentVersions(documents: MenuDocument[]) {
  const merged = new Map<string, MenuDocument>()

  for (const document of documents) {
    const publishedId = getPublishedId(document._id)
    const isDraft = document._id.startsWith('drafts.')
    const current = merged.get(publishedId)

    if (!current || isDraft) {
      merged.set(publishedId, {...document, _id: publishedId, hasUnpublishedChanges: isDraft})
    }
  }

  return [...merged.values()].sort((a, b) =>
    (a._createdAt ?? '').localeCompare(b._createdAt ?? ''),
  )
}

function createDocumentId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `menu-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useMenuRepository(client: SanityClient) {
  const [menus, setMenus] = useState<MenuDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [publishState, setPublishState] = useState<PublishState>('idle')
  const menusRef = useRef<MenuDocument[]>([])
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingMenuRef = useRef<MenuDocument | undefined>(undefined)
  const saveQueueRef = useRef<Promise<boolean>>(Promise.resolve(true))

  const replaceMenus = useCallback((nextMenus: MenuDocument[]) => {
    menusRef.current = nextMenus
    setMenus(nextMenus)
  }, [])

  const clearError = useCallback(() => setError(undefined), [])

  const persistNow = useCallback(
    (menu: MenuDocument) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = null
      if (pendingMenuRef.current === menu) pendingMenuRef.current = undefined
      setSaveState('saving')
      setError(undefined)

      const operation = saveQueueRef.current.then(async () => {
        try {
          const draftId = getDraftId(menu._id)
          const fields = {title: menu.title.trim(), categories: menu.categories ?? []}
          await client
            .transaction()
            .createIfNotExists({_id: draftId, _type: 'menu', ...fields})
            .patch(draftId, (patch) => patch.set(fields))
            .commit()
          replaceMenus(
            menusRef.current.map((candidate) =>
              candidate._id === menu._id
                ? {...candidate, hasUnpublishedChanges: true}
                : candidate,
            ),
          )
          if (!pendingMenuRef.current) setSaveState('saved')
          return true
        } catch (saveError) {
          setSaveState('error')
          setError(
            saveError instanceof Error ? saveError.message : 'Your draft could not be saved.',
          )
          return false
        }
      })

      saveQueueRef.current = operation
      return operation
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

      const nextMenu = {...updater(currentMenu), hasUnpublishedChanges: true}
      setPublishState('idle')
      replaceMenus(menusRef.current.map((menu) => (menu._id === menuId ? nextMenu : menu)))
      scheduleSave(nextMenu)
    },
    [replaceMenus, scheduleSave],
  )

  const flushPendingSave = useCallback(async () => {
    if (pendingMenuRef.current) return persistNow(pendingMenuRef.current)
    return saveQueueRef.current
  }, [persistNow])

  const createMenu = useCallback(
    async (title: string) => {
      setError(undefined)
      try {
        const publishedId = createDocumentId()
        const created = await client.create<MenuDocumentFields & {_id: string}>({
          _id: getDraftId(publishedId),
          _type: 'menu',
          title,
          categories: [],
        })
        const menu: MenuDocument = {
          ...created,
          _id: publishedId,
          hasUnpublishedChanges: true,
        }
        replaceMenus([...menusRef.current, menu])
        setSaveState('saved')
        return menu
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
        await saveQueueRef.current
        await client.transaction().delete(menuId).delete(getDraftId(menuId)).commit()
        replaceMenus(menusRef.current.filter((menu) => menu._id !== menuId))
        setSaveState('idle')
        setPublishState('idle')
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

  const publishMenu = useCallback(
    async (menuId: string) => {
      setPublishState('publishing')
      setError(undefined)

      const saved = await flushPendingSave()
      if (!saved) {
        setPublishState('error')
        return false
      }

      try {
        await client.action({
          actionType: 'sanity.action.document.publish',
          draftId: getDraftId(menuId),
          publishedId: getPublishedId(menuId),
        })
        replaceMenus(
          menusRef.current.map((menu) =>
            menu._id === menuId ? {...menu, hasUnpublishedChanges: false} : menu,
          ),
        )
        setSaveState('idle')
        setPublishState('published')
        return true
      } catch (publishError) {
        setPublishState('error')
        setError(
          publishError instanceof Error ? publishError.message : 'Your menu could not be published.',
        )
        return false
      }
    },
    [client, flushPendingSave, replaceMenus],
  )

  useEffect(() => {
    let active = true

    client
      .fetch<MenuDocument[]>(MENU_QUERY, {}, {perspective: 'raw'})
      .then((documents) => {
        if (active) replaceMenus(mergeDocumentVersions(documents))
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
        const fields = {title: pendingMenu.title.trim(), categories: pendingMenu.categories ?? []}
        const draftId = getDraftId(pendingMenu._id)
        void client
          .transaction()
          .createIfNotExists({_id: draftId, _type: 'menu', ...fields})
          .patch(draftId, (patch) => patch.set(fields))
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
    publishMenu,
    publishState,
    saveState,
    updateMenu,
  }
}
