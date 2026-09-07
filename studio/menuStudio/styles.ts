import styled, {createGlobalStyle} from 'styled-components'
import {palette} from '../../design-system/palette'

export const StudioGlobalStyle = createGlobalStyle`
  body {
    background: ${palette.background};
  }

  * {
    box-sizing: border-box;
  }
`

export const Shell = styled.main`
  --menu-background: ${palette.background};
  --menu-primary: ${palette.primary};
  --menu-secondary: ${palette.secondary};
  --menu-dark: ${palette.dark};
  --menu-ink: ${palette.ink};
  --menu-action: ${palette.action};
  --menu-white: ${palette.white};

  min-height: 100%;
  background: var(--menu-background);
  color: var(--menu-ink);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
`

export const TopPanel = styled.header`
  position: sticky;
  z-index: 20;
  top: 0;
  padding: 20px clamp(20px, 4vw, 64px) 18px;
  background: var(--menu-dark);
  color: var(--menu-white);
  box-shadow: 0 8px 28px rgb(47 53 46 / 12%);
`

export const TopPanelInner = styled.div`
  width: min(1280px, 100%);
  margin: 0 auto;
`

export const EyebrowRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 14px;
`

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`

export const BrandMark = styled.span`
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  background: var(--menu-primary);
  color: var(--menu-action);
`

export const BrandText = styled.div`
  strong {
    display: block;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
  }

  span {
    display: block;
    margin-top: 5px;
    color: rgb(255 255 255 / 68%);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
`

export const MenuCount = styled.span`
  color: rgb(255 255 255 / 72%);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`

export const QrCodeButton = styled.button`
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  gap: 7px;
  border: 1px solid rgb(255 255 255 / 38%);
  padding: 6px 10px;
  background: transparent;
  color: var(--menu-white);
  cursor: pointer;
  font-size: 10px;
  font-weight: 650;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  transition: 150ms ease;

  svg {
    width: 17px;
    height: 17px;
  }

  &:hover {
    border-color: var(--menu-primary);
    background: var(--menu-primary);
    color: var(--menu-ink);
  }

  &:focus-visible {
    outline: 2px solid var(--menu-white);
    outline-offset: 2px;
  }

  @media (max-width: 520px) {
    span {
      display: none;
    }
  }
`

export const MenuTabs = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: thin;
`

export const MenuTab = styled.button<{$active?: boolean}>`
  min-width: 166px;
  flex: 1 1 220px;
  max-width: 320px;
  border: 1px solid ${({$active}) => ($active ? palette.primary : 'rgb(255 255 255 / 28%)')};
  padding: 14px 16px;
  background: ${({$active}) => ($active ? palette.primary : 'transparent')};
  color: ${({$active}) => ($active ? palette.ink : palette.white)};
  cursor: pointer;
  text-align: left;
  transition: 150ms ease;

  &:hover {
    border-color: var(--menu-primary);
    background: ${({$active}) => ($active ? palette.primary : 'rgb(255 255 255 / 8%)')};
  }

  &:focus-visible {
    outline: 2px solid var(--menu-white);
    outline-offset: 2px;
  }

  small {
    display: block;
    margin-bottom: 6px;
    opacity: 0.62;
    font-size: 9px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  span {
    display: block;
    overflow: hidden;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const AddMenuButton = styled.button`
  display: grid;
  min-width: 52px;
  border: 1px solid rgb(255 255 255 / 42%);
  padding: 0;
  place-items: center;
  background: transparent;
  color: var(--menu-white);
  cursor: pointer;
  transition: 150ms ease;

  &:hover:not(:disabled) {
    border-color: var(--menu-primary);
    background: var(--menu-primary);
    color: var(--menu-ink);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.35;
  }
`

export const Content = styled.section`
  width: min(1040px, calc(100% - 40px));
  margin: 0 auto;
  padding: clamp(34px, 5vw, 68px) 0 80px;
`

export const ContentHeading = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 24px;
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgb(47 53 46 / 20%);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`

export const TitleBlock = styled.div`
  min-width: 0;

  label {
    display: block;
    margin-bottom: 8px;
    color: var(--menu-action);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
`

export const EditableName = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 6px;
`

export const NameText = styled.span<{$menu?: boolean}>`
  overflow: hidden;
  color: var(--menu-ink);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: ${({$menu}) => ($menu ? 'clamp(27px, 3.2vw, 36px)' : '19px')};
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const NameInput = styled.input<{$menu?: boolean}>`
  width: ${({$menu}) => ($menu ? 'min(380px, 100%)' : 'min(280px, 100%)')};
  min-width: 0;
  border: 0;
  border-bottom: 1px solid var(--menu-action);
  padding: 2px 4px 3px 0;
  background: transparent;
  color: var(--menu-ink);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: ${({$menu}) => ($menu ? 'clamp(27px, 3.2vw, 36px)' : '19px')};
  line-height: 1.1;

  &:focus {
    outline: 0;
  }
`

export const PencilButton = styled.button`
  display: grid;
  width: 31px;
  height: 31px;
  flex: 0 0 auto;
  border: 0;
  padding: 0;
  place-items: center;
  background: transparent;
  color: var(--menu-action);
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: rgb(47 53 46 / 7%);
  }
`

export const HeadingActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 640px) {
    justify-content: space-between;
  }
`

export const SaveStatus = styled.span<{$state?: string}>`
  color: ${({$state}) => ($state === 'error' ? palette.action : palette.dark)};
  font-size: 12px;
  white-space: nowrap;
`

export const TextButton = styled.button<{$danger?: boolean}>`
  border: 0;
  border-bottom: 1px solid ${({$danger}) => ($danger ? palette.ink : palette.action)};
  padding: 5px 0;
  background: transparent;
  color: ${({$danger}) => ($danger ? palette.ink : palette.action)};
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &:hover {
    opacity: 0.65;
  }
`

export const OutlineButton = styled.button<{$compact?: boolean}>`
  display: inline-flex;
  min-height: ${({$compact}) => ($compact ? '36px' : '44px')};
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--menu-action);
  padding: ${({$compact}) => ($compact ? '7px 12px' : '10px 18px')};
  background: transparent;
  color: var(--menu-action);
  cursor: pointer;
  font-size: 10px;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: 150ms ease;

  &:hover:not(:disabled) {
    background: var(--menu-action);
    color: var(--menu-white);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const PrimaryButton = styled(OutlineButton)`
  background: var(--menu-action);
  color: var(--menu-white);

  &:hover:not(:disabled) {
    background: var(--menu-ink);
  }
`

export const CategoryList = styled.div`
  display: grid;
  gap: 22px;
`

export const CategoryCard = styled.article`
  min-width: 0;
`

export const CategoryHeader = styled.div`
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 8px;
  min-height: 64px;
  border: 1px solid rgb(47 53 46 / 16%);
  padding: 10px 14px;
  background: var(--menu-primary);

  @media (max-width: 580px) {
    grid-template-columns: auto auto minmax(0, 1fr) auto auto;
    padding-inline: 8px;
  }
`

export const DragHandle = styled.button`
  display: grid;
  width: 32px;
  height: 38px;
  flex: 0 0 auto;
  border: 0;
  padding: 0;
  place-items: center;
  background: transparent;
  color: var(--menu-dark);
  cursor: grab;
  touch-action: none;

  &:hover {
    color: var(--menu-ink);
    background: rgb(47 53 46 / 6%);
  }

  &:active {
    cursor: grabbing;
  }
`

export const CategoryMoveControls = styled.div`
  display: grid;
  flex: 0 0 auto;
  gap: 1px;
`

export const MoveButton = styled.button`
  display: grid;
  width: 28px;
  height: 20px;
  border: 0;
  padding: 0;
  place-items: center;
  background: transparent;
  color: var(--menu-dark);
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover:not(:disabled) {
    background: rgb(47 53 46 / 7%);
    color: var(--menu-ink);
  }

  &:disabled {
    cursor: default;
    opacity: 0.22;
  }
`

export const AccordionButton = styled.button<{$expanded?: boolean}>`
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  border: 0;
  place-items: center;
  background: transparent;
  color: var(--menu-action);
  cursor: pointer;

  svg {
    transform: rotate(${({$expanded}) => ($expanded ? '180deg' : '0deg')});
    transition: transform 160ms ease;
  }
`

export const CategorySummary = styled.div`
  min-width: 0;
`

export const CategoryMeta = styled.span`
  display: block;
  margin-top: 3px;
  color: var(--menu-dark);
  font-size: 11px;
`

export const ToggleLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--menu-dark);
  cursor: pointer;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  em {
    font-style: normal;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  span {
    position: relative;
    width: 34px;
    height: 19px;
    border: 1px solid var(--menu-secondary);
    border-radius: 20px;
    background: var(--menu-primary);
    transition: 150ms ease;
  }

  span::after {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--menu-dark);
    content: '';
    transition: 150ms ease;
  }

  input:checked + span {
    background: var(--menu-action);
  }

  input:checked + span::after {
    background: var(--menu-white);
    transform: translateX(15px);
  }

  input:focus-visible + span {
    outline: 2px solid var(--menu-action);
    outline-offset: 2px;
  }

  @media (max-width: 580px) {
    > em {
      display: none;
    }
  }
`

export const IconButton = styled.button<{$danger?: boolean}>`
  display: grid;
  width: 38px;
  height: 38px;
  border: 0;
  padding: 0;
  place-items: center;
  background: transparent;
  color: ${({$danger}) => ($danger ? palette.ink : palette.action)};
  cursor: pointer;

  &:hover {
    background: rgb(47 53 46 / 7%);
  }
`

export const CategoryBody = styled.div`
  padding: 12px 14px 0 48px;

  @media (max-width: 580px) {
    padding: 12px 0 0;
  }
`

export const CategoryDescription = styled.textarea`
  width: 100%;
  min-height: 62px;
  resize: vertical;
  border: 1px solid rgb(47 53 46 / 18%);
  padding: 11px 12px;
  background: rgb(255 255 255 / 35%);
  color: var(--menu-ink);
  font: inherit;
  font-size: 13px;
  line-height: 1.5;

  &:focus {
    border-color: var(--menu-action);
    outline: 0;
  }
`

export const CoursesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 14px 0 10px;

  h3 {
    margin: 0;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
`

export const CourseList = styled.div`
  display: grid;
  gap: 8px;
`

export const CourseRow = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-left: 2px solid transparent;
  padding: 8px 10px 8px 6px;
  background: var(--menu-primary);
  color: var(--menu-ink);
  transition: 150ms ease;

  &:hover {
    border-left-color: var(--menu-action);
  }
`

export const CourseOpenButton = styled.button`
  display: grid;
  min-width: 0;
  grid-template-columns: 58px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--menu-ink);
  cursor: pointer;
  text-align: left;

  strong {
    display: block;
    overflow: hidden;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 16px;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    display: block;
    margin-top: 3px;
    overflow: hidden;
    color: var(--menu-dark);
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 520px) {
    grid-template-columns: 48px minmax(0, 1fr);

    > span:last-child {
      display: none;
    }
  }
`

export const CourseThumbnail = styled.div`
  display: grid;
  width: 58px;
  height: 52px;
  overflow: hidden;
  place-items: center;
  background: var(--menu-background);
  color: var(--menu-secondary);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 520px) {
    width: 48px;
    height: 44px;
  }
`

export const CoursePrice = styled.span`
  color: var(--menu-ink);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 15px;
  white-space: nowrap;
`

export const AddCategoryRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgb(47 53 46 / 16%);
`

export const AvailabilityDot = styled.span<{$available?: boolean}>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({$available}) => ($available ? palette.action : 'rgb(47 53 46 / 25%)')};
`

export const EmptyState = styled.div`
  display: grid;
  min-height: 190px;
  place-items: center;
  border: 1px dashed rgb(47 53 46 / 25%);
  padding: 30px;
  text-align: center;

  h2,
  h3 {
    margin: 0 0 8px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 24px;
    font-weight: 400;
  }

  p {
    max-width: 440px;
    margin: 0 0 18px;
    color: var(--menu-dark);
    font-size: 13px;
    line-height: 1.5;
  }
`

export const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: rgb(47 53 46 / 34%);
  backdrop-filter: blur(2px);
`

export const SidePanel = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(500px, 92vw);
  overflow-y: auto;
  padding: 28px clamp(22px, 4vw, 38px) 38px;
  background: var(--menu-background);
  box-shadow: -16px 0 50px rgb(47 53 46 / 18%);

  @media (max-width: 700px) {
    width: 100%;
  }
`

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(47 53 46 / 20%);

  small {
    display: block;
    margin-bottom: 7px;
    color: var(--menu-action);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 30px;
    font-weight: 400;
  }
`

export const FieldStack = styled.div`
  display: grid;
  gap: 20px;
`

export const Field = styled.label`
  display: grid;
  gap: 7px;
  color: var(--menu-ink);
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  input,
  textarea {
    width: 100%;
    border: 1px solid rgb(47 53 46 / 24%);
    border-radius: 0;
    padding: 12px 13px;
    background: rgb(255 255 255 / 45%);
    color: var(--menu-ink);
    font: inherit;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 1.45;
    text-transform: none;
  }

  textarea {
    min-height: 110px;
    resize: vertical;
  }

  input:focus,
  textarea:focus {
    border-color: var(--menu-action);
    outline: 0;
    box-shadow: 0 0 0 2px rgb(89 100 81 / 10%);
  }
`

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`

export const ImageDrop = styled.label`
  position: relative;
  display: grid;
  min-height: 190px;
  overflow: hidden;
  place-items: center;
  border: 1px dashed rgb(47 53 46 / 35%);
  background: var(--menu-primary);
  color: var(--menu-action);
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  div {
    z-index: 1;
    display: grid;
    justify-items: center;
    gap: 8px;
    padding: 14px;
    background: rgb(244 242 231 / 88%);
    font-size: 10px;
    font-weight: 650;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`

export const ImageActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`

export const PanelFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 30px;
  padding-top: 22px;
  border-top: 1px solid rgb(47 53 46 / 20%);
`

export const ModalCard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(430px, calc(100% - 32px));
  padding: 30px;
  background: var(--menu-background);
  box-shadow: 0 22px 60px rgb(47 53 46 / 24%);
  transform: translate(-50%, -50%);

  h2 {
    margin: 0 0 8px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 30px;
    font-weight: 400;
  }

  > p {
    margin: 0 0 24px;
    color: var(--menu-dark);
    font-size: 13px;
    line-height: 1.5;
  }
`

export const QrCodeModalCard = styled(ModalCard)`
  width: min(720px, calc(100% - 32px));
  max-height: calc(100vh - 32px);
  overflow-y: auto;
`

export const QrCodeWorkspace = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 250px) minmax(0, 1fr);
  align-items: start;
  gap: clamp(22px, 4vw, 38px);

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`

export const QrCodePreview = styled.div`
  display: grid;
  width: 100%;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgb(47 53 46 / 16%);
  padding: 12px;
  background: #fff;

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  span {
    color: var(--menu-dark);
    font-size: 12px;
  }

  @media (max-width: 620px) {
    width: min(250px, 100%);
    justify-self: center;
  }
`

export const QrCodeDetails = styled.div`
  display: grid;
  align-content: start;
  gap: 14px;

  > p {
    margin: 0;
    color: var(--menu-dark);
    font-size: 12px;
    line-height: 1.55;
  }

  > button {
    width: fit-content;
  }

  > a {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: 5px;
    color: var(--menu-action);
    font-size: 11px;
    font-weight: 650;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      text-decoration: underline;
    }

    svg {
      width: 15px;
      height: 15px;
    }
  }
`

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
`

export const ErrorBanner = styled.div`
  margin-bottom: 18px;
  border-left: 3px solid var(--menu-action);
  padding: 11px 13px;
  background: rgb(89 100 81 / 10%);
  color: var(--menu-ink);
  font-size: 13px;
`

export const Loading = styled.div`
  display: grid;
  min-height: 70vh;
  place-items: center;
  color: var(--menu-dark);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 22px;
`
