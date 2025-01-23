import styles from '@/css/Cart.module.css'

export const metadata = {
  title: 'My cart'
}

export default function RootLayout ({ children }) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}
