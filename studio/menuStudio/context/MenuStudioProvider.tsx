import type {ReactNode} from 'react'
import {useMenuStudioController} from '../hooks/useMenuStudioController'
import {MenuStudioContext} from './MenuStudioContext'

type MenuStudioProviderProps = {
  children: ReactNode
}

export function MenuStudioProvider({children}: MenuStudioProviderProps) {
  const controller = useMenuStudioController()

  return <MenuStudioContext.Provider value={controller}>{children}</MenuStudioContext.Provider>
}
