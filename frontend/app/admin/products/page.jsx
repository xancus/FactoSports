import { ProductContent } from '@/components/products/ProductContent'
import { getAllProducts } from '@/services/product'

export default async function ProductsPage () {
  const products = await getAllProducts()

  return (
    <div>
      <ProductContent products={products} />
    </div>
  )
}
