'use client'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { CreateCategoryForm } from '@/components/categories/CreateCatgoryForm'
import { DialogHeader } from '@/components/ui/DialogHeader'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/components/Dialog.module.css'

export function CategoryDialog ({ modal, onClose }) {
  if (!modal.show) return null
  const title = modal.action === 'create'
    ? 'Create new category'
    : 'Update'

  return (
    <div
      id='dialogRoot'
      className={styles.dialog}
    >
      <div className={styles.content}>
        <DialogHeader>
          <h3>{title}</h3>
          <i role='button' onClick={onClose}>
            <CloseIcon cls={iconStyles.midIcon} width='16' height='16' />
          </i>
        </DialogHeader>
        <div style={{ width: '100%' }}>
          <CreateCategoryForm onClose={onClose} currentItem={modal} />
        </div>
      </div>
    </div>
  )
}
