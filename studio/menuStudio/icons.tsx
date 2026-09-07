import type {SVGProps} from 'react'

type IconProps = SVGProps<SVGSVGElement>

const Icon = ({children, ...props}: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
)

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M5 7h14M5 12h14M5 17h14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.7"
    />
  </Icon>
)

export const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
  </Icon>
)

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
  </Icon>
)

export const ChevronIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="m8 10 4 4 4-4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  </Icon>
)

export const EditIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="m14.5 6.5 3 3M5 19l3.2-.7L18 8.5 15.5 6 5.7 15.8 5 19Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Icon>
)

export const TrashIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M8 8v10m4-10v10m4-10v10M5 5h14M9 5V3h6v2m3 0-1 16H7L6 5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Icon>
)

export const ImageIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" width="18" x="3" y="4" />
    <circle cx="9" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="m4 18 5-5 3.5 3 2.5-2 5 4"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Icon>
)

export const EyeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M2.8 12s3.3-5.5 9.2-5.5 9.2 5.5 9.2 5.5-3.3 5.5-9.2 5.5S2.8 12 2.8 12Z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </Icon>
)

export const EyeOffIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M4 4 20 20M9.7 6.8c.7-.2 1.5-.3 2.3-.3 5.9 0 9.2 5.5 9.2 5.5a14.7 14.7 0 0 1-2.7 3.3M14.4 17.2c-.7.2-1.5.3-2.4.3-5.9 0-9.2-5.5-9.2-5.5a14.8 14.8 0 0 1 2.8-3.4M9.9 9.9a3 3 0 0 0 4.2 4.2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </Icon>
)

export const ArrowIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M5 12h14m-5-5 5 5-5 5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </Icon>
)

export const DragIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="8" cy="7" fill="currentColor" r="1.2" />
    <circle cx="16" cy="7" fill="currentColor" r="1.2" />
    <circle cx="8" cy="12" fill="currentColor" r="1.2" />
    <circle cx="16" cy="12" fill="currentColor" r="1.2" />
    <circle cx="8" cy="17" fill="currentColor" r="1.2" />
    <circle cx="16" cy="17" fill="currentColor" r="1.2" />
  </Icon>
)

export const ArrowUpIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="m7.5 14 4.5-4.5 4.5 4.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  </Icon>
)

export const ArrowDownIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="m7.5 10 4.5 4.5 4.5-4.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  </Icon>
)

export const QrCodeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M4 4h6v6H4V4Zm2 2v2h2V6H6Zm8-2h6v6h-6V4Zm2 2v2h2V6h-2ZM4 14h6v6H4v-6Zm2 2v2h2v-2H6Zm8-2h2v2h-2v-2Zm4 0h2v4h-2v-4Zm-4 4h2v2h-2v-2Zm4 2h2v-2h-2v2Z"
      fill="currentColor"
    />
  </Icon>
)

export const DownloadIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  </Icon>
)

export const ExternalLinkIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M13 5h6v6m0-6-8 8M10 7H5v12h12v-5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    />
  </Icon>
)
