'use client'
import { Input } from '@/components/ui/Input'
import { useRef } from 'react'
import styles from '@/css/components/Form.module.css'

export function CheckList ({ checkItems, show, handleChange, items, name }) {
  const listRef = useRef(null)

  if (!show) return null
  return (
    <div className={styles.checkList} ref={listRef}>
      {items.map(feature => (
        <div key={feature.id}>
          <Input
            name={name}
            onChange={(ev) => handleChange(ev, feature)}
            type='checkbox'
            className={styles.input}
            checked={!!checkItems.find(val => val.id === feature.id)}
          />
          <span>{feature.name}</span>
        </div>
      ))}
    </div>

  )
}
