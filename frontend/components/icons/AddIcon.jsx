export function AddIcon ({ cls, width, height, fill }) {
  return (
    <svg
      width={width}
      height={height}
      className={cls}
      viewBox='0 0 16 16'
      fill={`${fill || 'currentColor'}`}
    >

      <path fillRule='evenodd' d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2' />
    </svg>
  )
}
