'use client'
import { CartIcon } from '@/components/icons/CartIcon'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/Layout.module.css'
import Link from 'next/link'

export function Header () {
  return (
    <nav className={styles.header}>
      <Link href='/'>
        <img
          className={styles.logo}
          alt='FactoSport logo'
          src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737357535/logo_zsbqcp.webp'
        />
      </Link>
      <Link href='/my-cart'>
        <CartIcon cls={iconStyles.bigIcon} />
      </Link>
    </nav>
  )
}
