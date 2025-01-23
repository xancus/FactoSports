import { ITEMS } from '@/app/consts/adminSidebar'
import { MenuItem } from '@/components/ui/MenuItem'
import styles from '@/css/components/Navbar.module.css'

export function NavBar () {
  return (
    <nav>
      <ul className={styles.sideBar}>
        {ITEMS.map((item, idx) => (
          <MenuItem key={idx} item={item} />
        ))}
      </ul>
    </nav>
  )
}
