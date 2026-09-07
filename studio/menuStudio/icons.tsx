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
