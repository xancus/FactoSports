'use client'
import { Button } from '@/components/ui/Button'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { DialogHeader } from '@/components/ui/DialogHeader'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/components/Dialog.module.css'

export function ConfirmDialog ({ showModal, onClose, onDelete }) {
  if (!showModal) return null

  return (
    <div
      id='dialogRoot'
      className={styles.dialog}
    >
      <div className={styles.content}>
        <DialogHeader>
          <h3>Delete</h3>
          <i role='button' onClick={onClose}>
            <CloseIcon cls={iconStyles.midIcon} width='16' height='16' />
          </i>
        </DialogHeader>
        <div style={{ width: '100%' }} className={styles.confirmDialog}>
          <span>This action cannot be undone.</span>
          <footer className={styles.footer}>
            <Button
              type='button'
              variant='secondary'
              clickHandler={onClose}
            >
              Cancel
            </Button>
            <Button
              variant='secondary'
              type='submit'
              clickHandler={onDelete}
            >
              Delete
            </Button>
          </footer>
        </div>
      </div>
    </div>
  )
}
