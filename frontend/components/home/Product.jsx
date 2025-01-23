import { Details } from '@/components/home/Details'
import { getProduct } from '@/services/product'
import styles from '@/css/Product.module.css'

export async function Product ({ productId }) {
  const product = await getProduct(productId)

  return (
    <section className={styles.content}>
      <picture className={styles.img}>
        <img
          alt={`${product.name} image`}
          src={product.img_src}
          fetchPriority='high'
        />
      </picture>
      <div className={styles.details}>
        <header className={styles.detailsHeader}>
          <h4>{product.name}</h4> <span>{product.description}</span>
        </header>

        <Details product={product} />
      </div>
    </section>
  )
}
