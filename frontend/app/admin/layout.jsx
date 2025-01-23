import { NavBar } from '@/components/layout/NavBar'
import { Session } from '@/components/providers/Session'
import styles from '@/css/AdminPage.module.css'

export default function RootLayout ({ children }) {
  return (
    <Session>
      <main className={styles.layout}>
        <NavBar />
        {children}
      </main>
    </Session>
  )
}
