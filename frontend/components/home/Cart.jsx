'use client'
import { ArrowdownIcon } from '@/components/icons/ArrowDownIcon'
import { Button } from '@/components/ui/Button'
import { showToast } from '@/components/ui/Toast'
import { useEffect, useState } from 'react'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/Product.module.css'

export function Cart ({ product, currentPrice, currentStock, filteredFeatures }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(false)
  const addItemsPossible = Array.from({ length: currentStock && currentStock <= 10 ? currentStock : 10 }, (_, index) => index + 1)

  useEffect(() => {
    const selected = filteredFeatures.some(feature => feature.name !== feature.showName)
    setSelectedFeature(selected)
  }, [filteredFeatures])

  function handleQuantity (ev) {
    const { value } = ev.target.dataset
    setQuantity(Number(value))
    setShowDropdown(false)
  }

  function handleCart () {
    const nobj = {
      name: product.name,
      img_src: product.img_src,
      productPrice: product.price,
      description: product.description,
      productId: product.id,
      features: filteredFeatures
        .filter(fv => (fv.name !== fv.showName))
        .map(({ feature_values, ...rest }) => rest)
        .sort((a, b) => a.name.localeCompare(b.name)),
      quantity: Number(quantity)
    }

    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || []

    const existingItemIndex = selectedItems?.findIndex((item) => {
      if (item.name !== nobj.name) return false

      const currentFeatures = item.features.sort((a, b) => a.name.localeCompare(b.name))

      return (
        currentFeatures.length === nobj.features.length &&
        currentFeatures.every((feature, index) => feature.showName === nobj.features[index].showName)
      )
    })

    if (existingItemIndex !== -1) {
      selectedItems[existingItemIndex].quantity += Number(quantity)
    } else {
      selectedItems.push(nobj)
    }

    localStorage.setItem('selectedItems', JSON.stringify(selectedItems))
    showToast({
      title: 'Product added to cart',
      type: 'success'
    })
  }

  return (
    <section className={styles.cart}>
      <h4>
        {(!selectedFeature || currentStock >= 1)
          ? 'In stock'
          : 'Temporarily out of stock'}
      </h4>
      <div className={styles.filterDiv}>
        <div
          role='button'
          className={styles.filterName}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span>Quantity: {quantity}</span>
          <i><ArrowdownIcon cls={iconStyles.midIcon} /></i>
        </div>
        {showDropdown && (
          <ul className={styles.filterOptions}>
            {addItemsPossible.map(el => (
              <li
                key={el}
              >
                <span
                  data-value={el}
                  onClick={handleQuantity}
                  className={styles.allowEvents}
                >{el}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button
        type='button'
        variant={quantity <= 0 ? 'inactive' : 'cart'}
        clickHandler={handleCart}
      >
        Add to cart
      </Button>
      <span aria-hidden='true' style={{ height: '3rem' }} />
    </section>
  )
}
