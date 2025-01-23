'use client'
import { createFeature, updateFeature } from '@/services/feature'
import { DialogFooter } from '@/components/ui/DialogFooter'
import { Input } from '@/components/ui/Input'
import { InputsList } from '@/components/ui/InputsList'
import { showToast } from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '@/css/components/Form.module.css'

export function CreateFeatureForm ({ onClose, currentItem }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [inputs, setInputs] = useState([
    { id: 0, name: '', price: 1, stock: 0, create: true }
  ])
  const [formValues, setFormvalues] = useState({
    name: ''
  })
  const [errors, setErrors] = useState({
    feature: '',
    feature_value: [{ name: '', price: '', stock: '' }]
  })

  useEffect(() => {
    if (!currentItem.item) return

    setInputs((currentItem.item.feature_values.map(itemInput => {
      const { id, name, price, stock } = itemInput
      return { id, name, price, stock, create: false }
    })
    ))
    setFormvalues({
      name: currentItem.item.name
    })
  }, [currentItem.item])

  function handleFormValues (ev) {
    const { value, name } = ev.target
    setFormvalues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit (event) {
    event.preventDefault()

    setPending(true)
    const formData = {
      feature: { id: currentItem?.item?.id, ...formValues },
      feature_value: inputs.map(inp => ({
        id: Number(inp.id),
        name: inp.name,
        price: Number(inp.price),
        stock: Number(inp.stock),
        create: Boolean(inp.create)
      }))
    }

    let data
    if (currentItem.action === 'update') data = await updateFeature(formData)
    else data = await createFeature(formData)

    if (data.error_type === 'validation') {
      setPending(false)
      const featureError = data.error?.feature?.[0] || null
      const featureValueErrors = (data.error?.feature_value || []).map(err => ({
        index: err.index,
        name: err.name?.[0] || '',
        price: err.price?.[0] || '',
        stock: err.stock?.[0] || ''
      }))

      return setErrors({
        feature: featureError,
        feature_value: featureValueErrors
      })
    } else if (data.error_type) {
      setPending(false)
      return showToast({
        title: data.message,
        type: 'error'
      })
    }
    showToast({
      title: currentItem.action === 'create' ? 'Feature created' : 'Feature updated',
      type: 'success'
    })
    setFormvalues({
      name: ''
    })
    setErrors({
      name: ''
    })
    setPending(false)
    router.refresh()
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.content}
      aria-label='Send feature form'
    >
      <div className={styles.inputContent}>
        <label htmlFor='name'>Name</label>
        <Input
          required
          value={formValues.name}
          name='name'
          id='name'
          onChange={handleFormValues}
          autoComplete='off'
          placeholder='Feature name'
          type='text'
          className={styles.input}
        />
        <span
          className={`
          error
          ${errors.feature === '' ? 'hidden' : 'block'}
          `}
        >{errors.feature}
        </span>
      </div>

      <InputsList errors={errors} inputs={inputs} setInputs={setInputs} />

      <DialogFooter onClose={onClose} pending={pending} />
    </form>
  )
}
