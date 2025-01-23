import { getAllCategories } from '@/services/category'
import { getAllProducts, getAllProductsByCategory } from '@/services/product'
import { normalizeString } from '@/app/utils/normalizeString'
import { Product } from '@/components/home/Product'
import { ProductsList } from '@/components/home/ProductsList'
import styles from '@/css/Home.module.css'

export default async function SegmentsPage ({ params }) {
  const { segments } = await params
  const categories = await getAllCategories()
  let products
  let productId

  if (!segments) products = await getAllProducts(true)
  else if (segments.at(0) !== 'product') {
    const categoryId = categories.find(cat => normalizeString(cat.name) === segments.at(0)).id
    products = await getAllProductsByCategory(categoryId, true)
  } else {
    productId = segments[1]
  }

  return (
    <main className={styles.layout}>
      {productId
        ? <Product productId={productId} />
        : (
          <ul className={styles.content}>
            <ProductsList products={products} />
          </ul>
          )}
    </main>
  )
}
