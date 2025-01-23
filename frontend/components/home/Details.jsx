'use client'
import { ArrowdownIcon } from '@/components/icons/ArrowDownIcon'
import { useEffect, useState } from 'react'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/Product.module.css'
import { getRestrictedFeatureValues } from '@/services/feature_value'
import { showToast } from '@/components/ui/Toast'
import { Cart } from './Cart'

export function Details ({ product }) {
  const [filteredFeatures, setFilteredFeatures] = useState(
    product.features.map(feature => ({
      ...feature,
      showName: feature.name,
      currentFeatureValue: undefined,
      price: 0,
      stock: undefined
    }))
  )
  const [showDropdown, setShowDropdown] = useState({
    show: false,
    id: undefined
  })
  const [currentPrice, setCurrentPrice] = useState(0)
  const [currentStock, setCurrentStock] = useState(0)

  useEffect(() => {
    let nStock
    let nPrice = 0

    filteredFeatures.forEach(feature => {
      nPrice += feature.price
      nStock = !nStock || feature.stock < nStock ? feature.stock : nStock
    })

    setCurrentPrice(nPrice)
    setCurrentStock(nStock)
  }, [filteredFeatures])

  function handleShow (ev) {
    const { id } = ev.target.dataset
    setShowDropdown(prev => ({
      show: Number(prev.id) === Number(id) ? !prev.show : true,
      id
    }))
  }

  async function handleRestrictedValues (ev) {
    const { id, parent } = ev.target.dataset

    const prevFilters = filteredFeatures
      .filter(el => el.name !== el.showName && Number(parent) !== Number(el.id))
      .map(el => Number(el.currentFeatureValue))

    try {
      const data = await getRestrictedFeatureValues(id, prevFilters)
      const currentValue = data.find(el => el.id === Number(id))
      if (currentValue.stock <= 0) {
        return showToast({
          title: 'You attempted to select an item that is temporarily out of stock. Please try again later.',
          type: 'error'
        })
      }
      const mapData = new Map()

      data.forEach(item => {
        if (!mapData.get(item.feature)) {
          mapData.set(item.feature, [])
        }
        mapData.get(item.feature).push({
          id: item.id,
          name: item.name,
          price: item.price,
          stock: item.stock
        })
      })

      setFilteredFeatures(prev => (
        prev.map(feature => {
          const selectedFeature = feature.id === Number(parent)
          if (mapData.get(feature.name)) {
            return {
              ...feature,
              feature_values: mapData.get(feature.name),
              showName: selectedFeature ? currentValue.name : feature.showName,
              price: selectedFeature ? currentValue.price : feature.price,
              stock: selectedFeature ? currentValue.stock : feature.stock,
              currentFeatureValue: selectedFeature ? currentValue.id : feature.currentFeatureValue
            }
          }
          return false
        })
      ))
      setShowDropdown(0)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.detailsBody}>
      <strong>{(product.price + currentPrice).toLocaleString('en-US', { currency: 'USD', style: 'currency' })}</strong>
      <span>Customize the product as much as you want!</span>
      {filteredFeatures?.map(feature => (
        <div key={feature.id} className={styles.filterDiv}>
          <div
            role='button'
            className={styles.filterName}
            data-id={feature.id}
            onClick={handleShow}
          >
            <span>{feature.showName}</span>
            <i><ArrowdownIcon cls={iconStyles.midIcon} /></i>
          </div>

          {(Number(showDropdown.id) === Number(feature.id) &&
            showDropdown.show) && (
              <ul className={styles.filterOptions}>
                {feature?.feature_values?.map(fvalue => (
                  <li
                    key={fvalue.id}
                  >
                    <span
                      data-id={fvalue.id}
                      data-parent={feature.id}
                      data-name={fvalue.name}
                      onClick={handleRestrictedValues}
                      className={`${fvalue.stock <= 0 ? styles.banEvents : styles.allowEvents}`}
                    >{fvalue.name}
                    </span>
                    {fvalue.stock <= 0 && (
                      <span className='errorLittleText'>Temporarily out of stock</span>)}
                  </li>
                ))}
              </ul>
          )}
        </div>
      ))}
      <Cart
        currentPrice={currentPrice}
        product={product}
        currentStock={currentStock}
        filteredFeatures={filteredFeatures}
      />
    </div>
  )
}
