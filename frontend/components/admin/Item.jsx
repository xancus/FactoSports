'use client'
import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { EditIcon } from '@/components/icons/EditIcon'
import { RemoveIcon } from '@/components/icons/RemoveIcon'
import { useState } from 'react'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/AdminPage.module.css'

export function Item ({ item, handleRemoveItem, handleEditModal }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  return (
    <div
      key={item.id}
      className={styles.records}
    >
      <ConfirmDialog
        showModal={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onDelete={() => handleRemoveItem(item.id)}
      />
      <h4>{item.name}</h4>
      <div className={styles.recordsActions}>
        <i
          role='button'
          onClick={handleEditModal}
        >
          <EditIcon cls={`${iconStyles.midIcon}`} />
        </i>
        <i role='button' onClick={() => setShowConfirmModal(true)}>
          <RemoveIcon cls={`${iconStyles.midIcon}`} />
        </i>
      </div>
    </div>

  )
}
