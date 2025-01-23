'use client'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { deleteFeature } from '@/services/feature'
import { Item } from '@/components/admin/Item'
import { NotFound } from '@/components/admin/NotFound'
import { FeatureDialog } from '@/components/features/FeatureDialog'
import { showToast } from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '@/css/AdminPage.module.css'

export function FeatureContent ({ features }) {
  const [modal, setModal] = useState({
    show: false,
    action: '',
    item: null
  })
  const router = useRouter()

  async function handleRemoveItem (id) {
    try {
      const res = await deleteFeature(id)
      showToast({
        title: res.message,
        type: 'success'
      })
      setModal(prev => ({ ...prev, show: false }))
      router.refresh()
    } catch (error) {
      showToast({
        title: error.message,
        type: 'error'
      })
    }
  }

  return (
    <div className={styles.main}>
      <FeatureDialog
        modal={modal}
        onClose={() => setModal(prev => ({ ...prev, show: false }))}
      />

      <AdminHeader setModal={setModal}>Features</AdminHeader>
      {features?.length > 0
        ? features.map(feature => (
          <Item
            key={feature.id}
            item={feature}
            handleRemoveItem={handleRemoveItem}
            handleEditModal={() => setModal({ show: true, action: 'update', item: feature })}
          />
        ))
        : <NotFound name='feature' setModal={setModal} />}
    </div>
  )
}
