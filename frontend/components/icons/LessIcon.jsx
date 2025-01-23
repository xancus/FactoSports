export function LessIcon ({ cls, width, height, fill }) {
  return (
    <svg
      width={width}
      height={height}
      fill={`${fill || 'currentColor'}`}
      className={cls}
      viewBox='0 0 16 16'
    >

      <path d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8' />
    </svg>
  )
}
