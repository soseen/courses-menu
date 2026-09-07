import {useMenuStudio} from '../context/useMenuStudio'
import {PlusIcon} from '../icons'
import {
  Content,
  ContentHeading,
  EmptyState,
  ErrorBanner,
  HeadingActions,
  Loading,
  PrimaryButton,
  SaveStatus,
  TextButton,
  TitleBlock,
} from '../styles'
import {getSaveStatusLabel} from '../utils'
import {InlineNameEditor} from './InlineNameEditor'
import {MenuCategories} from './MenuCategories'

export function MenuWorkspace() {
  const {
    deleteSelectedMenu,
    error,
    loading,
    openNewMenuDialog,
    saveState,
    selectedMenu,
    updateSelectedMenu,
  } = useMenuStudio()

  if (loading) return <Loading>Preparing your menus…</Loading>

  return (
    <Content>
      {error && <ErrorBanner>{error}</ErrorBanner>}

      {!selectedMenu ? (
        <EmptyState>
          <div>
            <h2>Create your first menu</h2>
            <p>
              Start with a menu name, then organise its courses into clear, easy-to-scan categories.
            </p>
            <PrimaryButton onClick={openNewMenuDialog} type="button">
              <PlusIcon /> Add menu
            </PrimaryButton>
          </div>
        </EmptyState>
      ) : (
        <>
          <ContentHeading>
            <TitleBlock>
              <label>Menu name</label>
              <InlineNameEditor
                label="Menu name"
                menu
                onSave={(title) => updateSelectedMenu((menu) => ({...menu, title}))}
                value={selectedMenu.title}
              />
            </TitleBlock>
            <HeadingActions>
              <SaveStatus $state={saveState}>{getSaveStatusLabel(saveState)}</SaveStatus>
              <TextButton $danger onClick={() => void deleteSelectedMenu()} type="button">
                Remove menu
              </TextButton>
            </HeadingActions>
          </ContentHeading>

          <MenuCategories key={selectedMenu._id} />
        </>
      )}
    </Content>
  )
}
