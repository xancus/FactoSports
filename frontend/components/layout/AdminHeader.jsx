'use client'
import { AddIcon } from '@/components/icons/AddIcon'
import { Button } from '@/components/ui/Button'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/AdminPage.module.css'

export function AdminHeader ({ children, setModal }) {
  function showModal () {
    setModal({ show: true, action: 'create', item: null })
  }
  return (
    <header className={styles.header}>
      <h3>{children}</h3>
      <div>
        <Button
          type='button'
          variant='primary'
          clickHandler={showModal}
        >
          <AddIcon width={16} height={16} cls={iconStyles.midIcon} />
          Create new
        </Button>
      </div>
    </header>
  )
}
