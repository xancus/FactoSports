'use client'
import { useEffect, useState } from 'react'
import styles from '@/css/Cart.module.css'

export function CartFooter ({ cart }) {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let quantity = 0
    let price = 0
    cart.forEach(item => {
      quantity += item.quantity
      price += (item.quantity * (item.price + item.productPrice))
    })
    setTotalPrice(price)
    setTotalProducts(quantity)
  }, [cart])
  return (
    <footer className={styles.footer}>
      <span>Subtotal ({totalProducts} products): <strong>{totalPrice.toLocaleString('en-US', { currency: 'USD', style: 'currency' })}</strong></span>
    </footer>
  )
}
