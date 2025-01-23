'use client'
import { Button } from '@/components/ui/Button'
import { AddIcon } from '@/components/icons/AddIcon'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/components/NotFound.module.css'

export function NotFound ({ name, setModal }) {
  function showModal () {
    setModal({ show: true, action: 'create', item: null })
  }

  return (
    <div className={styles.content}>
      <span>No {name} found</span>
      <Button type='button' variant='primary' clickHandler={showModal}>
        <AddIcon width={16} height={16} cls={iconStyles.midIcon} />
        Create new {name}
      </Button>
    </div>
  )
}
