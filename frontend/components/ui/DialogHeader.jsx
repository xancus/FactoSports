'use client'
import styles from '@/css/components/Dialog.module.css'

export function DialogHeader ({ children }) {
  return (
    <div className={styles.header}>
      {children}
    </div>
  )
}
