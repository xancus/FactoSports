import styles from '@/css/components/Buttons.module.css'

export function Button ({ children, variant = 'primary', clickHandler, type }) {
  return (
    <button
      type={type}
      className={`${styles.baseButton} ${styles[variant]}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  )
}
