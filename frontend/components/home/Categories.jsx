'use client'
import { ArrowdownIcon } from '../icons/ArrowDownIcon'
import { MenuItem } from '@/components/ui/MenuItem'
import { useState } from 'react'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/Home.module.css'

export function Categories ({ categories }) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div>
      <span
        onMouseEnter={() => setShowDropdown(true)}
        className={styles.headerItem}
        onMouseLeave={() => setShowDropdown(false)}
      >
        Sports
        <ArrowdownIcon
          width={16}
          height={16}
          ls={`${iconStyles.midIcon}`}
        />
        {showDropdown && (
          <ul className={styles.subHeader}>
            {categories.map(category => (
              <MenuItem key={category.id} item={category} />
            ))}
          </ul>
        )}
      </span>
    </div>
  )
}
