'use client'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { deleteProduct } from '@/services/product'
import { Item } from '@/components/admin/Item'
import { NotFound } from '@/components/admin/NotFound'
import { ProductDialog } from '@/components/products/ProductDialog'
import { showToast } from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from '@/css/AdminPage.module.css'

export function ProductContent ({ products }) {
  const [modal, setModal] = useState({
    show: false,
    action: '',
    item: null
  })
  const router = useRouter()

  async function handleRemoveItem (id) {
    try {
      const res = await deleteProduct(id)
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
      <ProductDialog modal={modal} onClose={() => setModal(prev => ({ ...prev, show: false }))} />

      <AdminHeader setModal={setModal}>Products</AdminHeader>
      {products?.length > 0
        ? products.map(product => (
          <Item
            key={product.id}
            item={product}
            handleRemoveItem={handleRemoveItem}
            handleEditModal={() => setModal({ show: true, action: 'update', item: product })}
          />
        ))
        : <NotFound name='products' setModal={setModal} />}
    </div>
  )
}
