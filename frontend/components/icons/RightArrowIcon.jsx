export function RightArrowIcon ({ cls, width, height, fill }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill={`${fill || 'currentColor'}`}
      className={cls}
    >
      <path
        d='M6 4 L10 8 L6 12'
        fill='none'
        stroke={`${fill || 'currentColor'}`}
        strokeWidth='1'
      />
    </svg>
  )
}
