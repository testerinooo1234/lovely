type HeartLogoProps = {
  size?: number
  className?: string
}

export function HeartLogo({ size = 28, className = '' }: HeartLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 28s-10.5-6.8-13.2-12.2C.8 11.4 2.2 6.8 6.4 5.4c2.4-.8 5 .2 6.6 2.2L16 11l3-3.4c1.6-2 4.2-3 6.6-2.2 4.2 1.4 5.6 6 3.6 10.4C26.5 21.2 16 28 16 28z"
        fill="currentColor"
      />
    </svg>
  )
}
