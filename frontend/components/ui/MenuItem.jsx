'use client'
import styles from '@/css/components/Navbar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { normalizeString } from '@/app/utils/normalizeString'

export function MenuItem ({ item }) {
  const pathname = usePathname()
  const page = pathname.split('/').at(-1)
  const normalizedName = normalizeString(item.name)

  return (
    <li>
      <Link
        href={`/${item.key ? `admin/${item.key}` : normalizedName}`}
        className={`
          ${styles.item}
          ${page === normalizedName
            ? styles.itemActive
            : styles.itemDeactivate
          }`}
      >
        <span>{item.name}</span>
      </Link>
    </li>
  )
}
