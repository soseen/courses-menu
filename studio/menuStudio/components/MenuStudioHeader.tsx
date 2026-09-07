import {useMenuStudio} from '../context/useMenuStudio'
import {MenuIcon, PlusIcon, QrCodeIcon} from '../icons'
import {
  AddMenuButton,
  Brand,
  BrandMark,
  BrandText,
  EyebrowRow,
  HeaderActions,
  MenuCount,
  MenuTab,
  MenuTabs,
  QrCodeButton,
  TopPanel,
  TopPanelInner,
} from '../styles'

export function MenuStudioHeader() {
  const {maxMenus, menus, openNewMenuDialog, openQrCodeDialog, selectedMenuId, selectMenu} =
    useMenuStudio()
  const hasReachedMenuLimit = menus.length >= maxMenus

  return (
    <TopPanel>
      <TopPanelInner>
        <EyebrowRow>
          <Brand>
            <BrandMark>
              <MenuIcon />
            </BrandMark>
            <BrandText>
              <strong>Menus</strong>
              <span>Courses menu studio</span>
            </BrandText>
          </Brand>
          <HeaderActions>
            <QrCodeButton onClick={openQrCodeDialog} type="button">
              <QrCodeIcon />
              <span>QR code</span>
            </QrCodeButton>
            <MenuCount>
              {menus.length} / {maxMenus} menus
            </MenuCount>
          </HeaderActions>
        </EyebrowRow>

        <MenuTabs aria-label="Available menus">
          {menus.map((menu, index) => (
            <MenuTab
              $active={menu._id === selectedMenuId}
              aria-pressed={menu._id === selectedMenuId}
              key={menu._id}
              onClick={() => selectMenu(menu._id)}
              type="button"
            >
              <small>Menu {index + 1}</small>
              <span>{menu.title || 'Untitled menu'}</span>
            </MenuTab>
          ))}
          <AddMenuButton
            aria-label={hasReachedMenuLimit ? 'Maximum of three menus reached' : 'Add a menu'}
            disabled={hasReachedMenuLimit}
            onClick={openNewMenuDialog}
            title={hasReachedMenuLimit ? 'Maximum of three menus reached' : 'Add menu'}
            type="button"
          >
            <PlusIcon />
          </AddMenuButton>
        </MenuTabs>
      </TopPanelInner>
    </TopPanel>
  )
}
