import Link from 'next/link'
import styles from '@/css/Home.module.css'

export function ProductsList ({ products }) {
  return (
    products.map(product => (
      <li key={product.id} className={styles.product}>
        <Link href={`/product/${product.id}`}>
          <img
            className={styles.productImg}
            src={product.img_src}
            alt={`Image of ${product.name}`}
            fetchPriority='high'
          />
          <div className={styles.productHeader}>
            <h4>{product.name}</h4>
            <span>{product.price.toLocaleString('en-US', { currency: 'USD', style: 'currency' })}</span>
          </div>
          <p className={styles.productDescription}>{product.description}</p>
        </Link>
      </li>
    ))
  )
}
