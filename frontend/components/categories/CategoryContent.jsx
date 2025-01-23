'use client'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { CategoryDialog } from '@/components/categories/CategoryDialog'
import { deleteCategory } from '@/services/category'
import { Item } from '@/components/admin/Item'
import { NotFound } from '@/components/admin/NotFound'
import { showToast } from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '@/css/AdminPage.module.css'

export function CategoryContent ({ categories }) {
  const [modal, setModal] = useState({
    show: false,
    action: '',
    item: null
  })
  const router = useRouter()

  async function handleRemoveItem (id) {
    try {
      const res = await deleteCategory(id)
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
      <CategoryDialog modal={modal} onClose={() => setModal(prev => ({ ...prev, show: false }))} />

      <AdminHeader setModal={setModal}>Cateogries</AdminHeader>
      {categories?.length > 0
        ? categories.map(category => (
          <Item
            key={category.id}
            item={category}
            handleRemoveItem={handleRemoveItem}
            handleEditModal={() => setModal({ show: true, action: 'update', item: category })}
          />
        ))
        : <NotFound name='categories' setModal={setModal} />}
    </div>
  )
}
