import {CourseEditorPanel} from './components/CourseEditorPanel'
import {MenuStudioHeader} from './components/MenuStudioHeader'
import {MenuWorkspace} from './components/MenuWorkspace'
import {NewMenuDialog} from './components/NewMenuDialog'
import {QrCodeDialog} from './components/QrCodeDialog'
import {MenuStudioProvider} from './context/MenuStudioProvider'
import {Shell, StudioGlobalStyle} from './styles'

export function MenuStudio() {
  return (
    <MenuStudioProvider>
      <Shell>
        <StudioGlobalStyle />
        <MenuStudioHeader />
        <MenuWorkspace />
        <NewMenuDialog />
        <QrCodeDialog />
        <CourseEditorPanel />
      </Shell>
    </MenuStudioProvider>
  )
}
