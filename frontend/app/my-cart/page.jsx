'use client'
import { AddIcon } from '@/components/icons/AddIcon'
import { CartFooter } from '@/components/cart/CartFooter'
import { LessIcon } from '@/components/icons/LessIcon'
import { RemoveIcon } from '@/components/icons/RemoveIcon'
import { useEffect, useState } from 'react'
import { useFeatureValues } from '@/hooks/useFeatureValues'
import iconStyles from '@/css/Icons.module.css'
import Link from 'next/link'
import styles from '@/css/Cart.module.css'

export default function MyCartPage () {
  const [cart, setCart] = useState([])
  const { featureValues } = useFeatureValues()

  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem('selectedItems')) || []
    const fvMap = new Map()

    // build Map for every feature value id
    featureValues.forEach(fv => {
      if (!fvMap.get(fv.id)) fvMap.set(fv.id, fv)
    })

    // set the new possible price and stock feature values from server
    const nCart = currentCart
      .map(item => {
        let price = 0
        let stock
        item.features.forEach(fv => {
          const cartItem = fvMap.get(fv.currentFeatureValue)
          if (cartItem) {
            price += cartItem.price
            stock = !stock || cartItem.stock < stock ? cartItem.stock : stock
          }
        })
        return {
          ...item,
          price,
          stock
        }
      })

    setCart(nCart)
  }, [featureValues])

  function handleCart (action, product) {
    const productIndex = cart.findIndex(item =>
      item.name === product.name &&
      JSON.stringify(item.features) === JSON.stringify(product.features)
    )
    if (productIndex === -1) return

    const updatedCart = [...cart]

    if (action === 'add') {
      updatedCart[productIndex].quantity += 1
    } else if (action === 'substract') {
      if (updatedCart[productIndex].quantity === 1) {
        updatedCart.splice(productIndex, 1)
      } else {
        updatedCart[productIndex].quantity -= 1
      }
    }

    setCart(updatedCart)
    localStorage.setItem('selectedItems', JSON.stringify(updatedCart))
  }

  return (
    <main className={styles.layout}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h3>My cart</h3>
          <span>Price</span>
        </header>
        {cart.map((product, idx) => (
          <section
            className={styles.content}
            key={idx}
          >
            <picture className={styles.img}>
              <img
                alt={`${product.name} image`}
                src={product.img_src}
                fetchPriority='high'
              />
            </picture>
            <div className={styles.details}>
              <header className={styles.detailsHeader}>
                <Link href={`/product/${product?.productId}`}>
                  <h4>{product.name}</h4> <span>{product.description}</span>
                </Link>
              </header>
              <div>
                {product?.features?.map((feature, idx) => (
                  <div key={idx} className='littleLightText'>
                    <strong key={idx}>{feature.name}</strong>: <span>{feature.showName}</span>
                  </div>
                ))}
              </div>
              <div
                className={styles.cartButton}
              >
                <i
                  onClick={() => handleCart('substract', product)}
                >
                  {Number(product.quantity) <= 1
                    ? <RemoveIcon
                        width={16}
                        height={16}
                        ls={`${iconStyles.midIcon}`}
                      />
                    : <LessIcon
                        width={16}
                        height={16}
                        ls={`${iconStyles.midIcon}`}
                      />}

                </i>
                <span>{product.quantity}</span>
                <i onClick={() => handleCart('add', product)}>
                  <AddIcon
                    width={16}
                    height={16}
                    ls={`${iconStyles.midIcon}`}
                  />
                </i>

              </div>
            </div>
            <strong style={{ marginTop: 'var(--widget-padding)' }}>
              {(product.quantity * (product.price + product.productPrice)).toLocaleString('en-US', { currency: 'USD', style: 'currency' })}
            </strong>
          </section>
        ))}
      </div>

      <CartFooter cart={cart} />
    </main>
  )
}
