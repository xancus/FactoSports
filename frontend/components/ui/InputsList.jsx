'use client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { RemoveIcon } from '@/components/icons/RemoveIcon'
import { useState } from 'react'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/components/Form.module.css'

export function InputsList ({ errors, inputs, setInputs }) {
  const [errorMessage, setErrorMessage] = useState('')

  function handleAddInput () {
    const lastInput = inputs[inputs.length - 1]
    if (lastInput?.name.trim() === '') {
      setErrorMessage('Please fill in the current input before adding another.')
      return
    }
    setErrorMessage('')
    setInputs(prev => [
      ...prev,
      { id: prev.length, name: '', price: 1, stock: 0, create: true }
    ])
  }

  function handleDynamicInputs (ev, id) {
    const { name, value } = ev.target

    const updatedInputs = inputs.map(input =>
      input.id === Number(id)
        ? { ...input, [name]: value }
        : input
    )
    setInputs(updatedInputs)
  }

  function handleRemoveInput (id) {
    setErrorMessage('')
    setInputs(prev => prev.filter(input => input.id !== id))
  }

  return (
    <section className={styles.inputContent}>
      <h4>Customize the feature value(s)</h4>

      {inputs.map((input, idx) => (
        <div
          key={input.id}
          id={input.id}
          className={styles.inputContent}
          data-name='dynamicInputs'
        >
          <div className={styles.inputContentIcon}>
            <span className={`${styles.inputListIndex} littleText`}>Option #{idx + 1} </span>
            <i
              role='button'
              onClick={() => handleRemoveInput(input.id)}
            >
              <RemoveIcon cls={`${iconStyles.midIcon}`} />
            </i>
          </div>

          <label>Name</label>
          <div className={styles.inputContent}>
            <Input
              name='name'
              value={input.name}
              onChange={(ev) => handleDynamicInputs(ev, input.id)}
              placeholder='Feature value'
              type='text'
              className={styles.input}
              min={2}
            />
          </div>
          <span
            className={`
            error
            ${errors?.feature_value.find(f => f.index === input.id)?.name === '' ? 'hidden' : 'block'}
            `}
          >{errors?.feature_value.find(f => f.index === input.id)?.name}
          </span>

          <div className={styles.inputShort}>
            <label>Price</label>
            <Input
              required
              value={input.price}
              name='price'
              onChange={(ev) => handleDynamicInputs(ev, input.id)}
              min={1}
              type='number'
              className={styles.input}
            />
          </div>
          <span
            className={`
            error
            ${errors?.feature_value.find(f => f.index === input.id)?.price === '' ? 'hidden' : 'block'}
            `}
          >{errors?.feature_value.find(f => f.index === input.id)?.price}
          </span>

          <div className={styles.inputShort}>
            <label>Stock</label>
            <Input
              required
              value={input.stock}
              name='stock'
              onChange={(ev) => handleDynamicInputs(ev, input.id)}
              min={0}
              type='number'
              className={styles.input}
            />
          </div>
          <span
            className={`
            error
            ${errors?.feature_value.find(f => f.index === input.id)?.stock === '' ? 'hidden' : 'block'}
            `}
          >{errors?.feature_value.find(f => f.index === input.id)?.stock}
          </span>
        </div>
      ))}

      <div>
        <Button
          variant='secondary'
          type='button'
          clickHandler={handleAddInput} // Agregar nuevo input
        >
          Add value
        </Button>
      </div>

      {errorMessage && <span className='error'>{errorMessage}</span>}
    </section>
  )
}
