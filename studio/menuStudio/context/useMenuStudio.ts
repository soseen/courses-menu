import {useContext} from 'react'
import {MenuStudioContext} from './MenuStudioContext'

export function useMenuStudio() {
  const context = useContext(MenuStudioContext)
  if (!context) throw new Error('useMenuStudio must be used within a MenuStudioProvider')
  return context
}
