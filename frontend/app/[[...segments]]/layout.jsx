import { Categories } from '@/components/home/Categories'
import { getAllCategories } from '@/services/category'
import styles from '@/css/Home.module.css'

export const metadata = {
  title: 'Product page',
  description: 'Find all the products you need for your favorite sport.'
}

export default async function SegmentLayout ({ children }) {
  const categories = await getAllCategories()
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Categories categories={categories} />
      </header>
      {children}
    </div>
  )
}
