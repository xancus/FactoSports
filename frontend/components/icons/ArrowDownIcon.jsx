export function ArrowdownIcon ({ cls, width, height, fill }) {
  return (
    <svg
      width={width}
      height={height}
      className={cls}
      viewBox='0 0 24 24' strokeWidth={1.5}
      stroke={`${fill || 'currentColor'}`}
      fill='none'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
    </svg>

  )
}
