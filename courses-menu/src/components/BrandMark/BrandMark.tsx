import styles from './BrandMark.module.css'

export function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      className={styles.mark}
      fill="none"
      viewBox="0 0 42 42"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="currentColor" height="42" width="42" />
      <path
        d="M11 14c6.5-2.7 13.5 2.7 20 0M11 21c6.5-2.7 13.5 2.7 20 0M11 28c6.5-2.7 13.5 2.7 20 0"
        stroke="var(--menu-color-action)"
        strokeWidth="2"
      />
    </svg>
  )
}
