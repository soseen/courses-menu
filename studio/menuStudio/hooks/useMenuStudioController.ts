import {useCallback, useEffect, useMemo, useState} from 'react'
import {arrayMove} from '@dnd-kit/sortable'
import {useClient} from 'sanity'
import {MAX_MENUS, MENU_API_VERSION} from '../constants'
import type {CourseEditorTarget, MenuCategory, MenuDocument, MenuItem} from '../types'
import {createKey} from '../utils'
import {useMenuRepository} from './useMenuRepository'

export function useMenuStudioController() {
  const client = useClient({apiVersion: MENU_API_VERSION})
  const {dataset = '', projectId = ''} = client.config()
  const {
    clearError,
    createMenu: createMenuDocument,
    deleteMenu: deleteMenuDocument,
    error,
    flushPendingSave,
    loading,
    menus,
    saveState,
    updateMenu,
  } = useMenuRepository(client)
  const [selectedMenuId, setSelectedMenuId] = useState<string>()
  const [editor, setEditor] = useState<CourseEditorTarget | null>(null)
  const [isNewMenuDialogOpen, setNewMenuDialogOpen] = useState(false)

  const selectedMenu = useMemo(
    () => menus.find((menu) => menu._id === selectedMenuId),
    [menus, selectedMenuId],
  )
  const editorCategory = useMemo(
    () => selectedMenu?.categories?.find((category) => category._key === editor?.categoryKey),
    [editor?.categoryKey, selectedMenu?.categories],
  )
  const editorItem = useMemo(
    () => editorCategory?.items?.find((item) => item._key === editor?.itemKey),
    [editor?.itemKey, editorCategory?.items],
  )

  useEffect(() => {
    if (loading || selectedMenu) return
    setSelectedMenuId(menus[0]?._id)
  }, [loading, menus, selectedMenu])

  const selectMenu = useCallback(
    (menuId: string) => {
      flushPendingSave()
      setSelectedMenuId(menuId)
      setEditor(null)
    },
    [flushPendingSave],
  )

  const updateSelectedMenu = useCallback(
    (updater: (menu: MenuDocument) => MenuDocument) => {
      if (selectedMenuId) updateMenu(selectedMenuId, updater)
    },
    [selectedMenuId, updateMenu],
  )

  const updateCategory = useCallback(
    (categoryKey: string, updater: (category: MenuCategory) => MenuCategory) => {
      updateSelectedMenu((menu) => ({
        ...menu,
        categories: (menu.categories ?? []).map((category) =>
          category._key === categoryKey ? updater(category) : category,
        ),
      }))
    },
    [updateSelectedMenu],
  )

  const addCategory = useCallback(() => {
    const category: MenuCategory = {
      _key: createKey(),
      _type: 'category',
      name: 'New category',
      description: '',
      visible: true,
      items: [],
    }
    updateSelectedMenu((menu) => ({
      ...menu,
      categories: [...(menu.categories ?? []), category],
    }))
    return category._key
  }, [updateSelectedMenu])

  const moveCategory = useCallback(
    (categoryKey: string, direction: -1 | 1) => {
      updateSelectedMenu((menu) => {
        const categories = menu.categories ?? []
        const currentIndex = categories.findIndex((category) => category._key === categoryKey)
        const nextIndex = currentIndex + direction
        if (currentIndex < 0 || nextIndex < 0 || nextIndex >= categories.length) return menu
        return {...menu, categories: arrayMove(categories, currentIndex, nextIndex)}
      })
    },
    [updateSelectedMenu],
  )

  const removeCategory = useCallback(
    (category: MenuCategory) => {
      const confirmed = window.confirm(
        `Delete “${category.name ?? 'this category'}” and all of its courses?`,
      )
      if (!confirmed) return

      updateSelectedMenu((menu) => ({
        ...menu,
        categories: (menu.categories ?? []).filter((candidate) => candidate._key !== category._key),
      }))
    },
    [updateSelectedMenu],
  )

  const reorderCourses = useCallback(
    (categoryKey: string, activeItemKey: string, overItemKey: string) => {
      if (activeItemKey === overItemKey) return
      updateCategory(categoryKey, (category) => {
        const items = category.items ?? []
        const currentIndex = items.findIndex((item) => item._key === activeItemKey)
        const nextIndex = items.findIndex((item) => item._key === overItemKey)
        if (currentIndex < 0 || nextIndex < 0) return category
        return {...category, items: arrayMove(items, currentIndex, nextIndex)}
      })
    },
    [updateCategory],
  )

  const createMenu = useCallback(
    async (name: string) => {
      const title = name.trim()
      if (!title || menus.length >= MAX_MENUS) return false

      const created = await createMenuDocument(title)
      if (!created) return false

      setSelectedMenuId(created._id)
      setEditor(null)
      return true
    },
    [createMenuDocument, menus.length],
  )

  const deleteSelectedMenu = useCallback(async () => {
    if (!selectedMenu) return
    const confirmed = window.confirm(
      `Delete “${selectedMenu.title}”? This permanently removes the menu and all of its categories and courses.`,
    )
    if (!confirmed) return

    const nextSelectedId = menus.find((menu) => menu._id !== selectedMenu._id)?._id
    if (await deleteMenuDocument(selectedMenu._id)) {
      setSelectedMenuId(nextSelectedId)
      setEditor(null)
    }
  }, [deleteMenuDocument, menus, selectedMenu])

  const saveCourse = useCallback(
    (item: MenuItem) => {
      if (!editor) return
      updateCategory(editor.categoryKey, (category) => {
        const items = category.items ?? []
        const exists = items.some((candidate) => candidate._key === item._key)
        return {
          ...category,
          items: exists
            ? items.map((candidate) => (candidate._key === item._key ? item : candidate))
            : [...items, item],
        }
      })
      setEditor(null)
    },
    [editor, updateCategory],
  )

  const deleteCourse = useCallback(() => {
    if (!editor || !editorItem) return
    const confirmed = window.confirm(`Delete “${editorItem.name ?? 'this course'}”?`)
    if (!confirmed) return

    updateCategory(editor.categoryKey, (category) => ({
      ...category,
      items: (category.items ?? []).filter((item) => item._key !== editorItem._key),
    }))
    setEditor(null)
  }, [editor, editorItem, updateCategory])

  const openNewMenuDialog = useCallback(() => {
    clearError()
    setNewMenuDialogOpen(true)
  }, [clearError])

  const closeCourseEditor = useCallback(() => setEditor(null), [])
  const closeNewMenuDialog = useCallback(() => setNewMenuDialogOpen(false), [])
  const openCourseEditor = useCallback(
    (categoryKey: string, itemKey?: string) => setEditor({categoryKey, itemKey}),
    [],
  )

  return {
    addCategory,
    client,
    closeCourseEditor,
    closeNewMenuDialog,
    createMenu,
    dataset,
    deleteCourse,
    deleteSelectedMenu,
    editor,
    editorCategory,
    editorItem,
    error,
    isNewMenuDialogOpen,
    loading,
    maxMenus: MAX_MENUS,
    menus,
    moveCategory,
    openCourseEditor,
    openNewMenuDialog,
    projectId,
    removeCategory,
    reorderCourses,
    saveCourse,
    saveState,
    selectedMenu,
    selectedMenuId,
    selectMenu,
    updateCategory,
    updateSelectedMenu,
  }
}

export type MenuStudioController = ReturnType<typeof useMenuStudioController>
