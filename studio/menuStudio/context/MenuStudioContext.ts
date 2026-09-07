import {createContext} from 'react'
import type {MenuStudioController} from '../hooks/useMenuStudioController'

export const MenuStudioContext = createContext<MenuStudioController | null>(null)
