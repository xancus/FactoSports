'use client'
import { createCategory, updateCategory } from '@/services/category'
import { DialogFooter } from '@/components/ui/DialogFooter'
import { Input } from '@/components/ui/Input'
import { showToast } from '@/components/ui/Toast'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '@/css/components/Form.module.css'

export function CreateCategoryForm ({ onClose, currentItem }) {
  const [pending, setPending] = useState(false)
  const [formValues, setFormvalues] = useState({ name: '' })
  const [errors, setErrors] = useState({ name: null })
  const router = useRouter()

  useEffect(() => {
    if (!currentItem.item) return

    setFormvalues({
      id: currentItem.item.id,
      name: currentItem.item.name
    })
  }, [currentItem.item])

  function handleFormValues (ev) {
    const { value } = ev.target
    setFormvalues(prev => ({
      ...prev,
      name: value
    }))
  }

  async function handleSubmit (event) {
    event.preventDefault()

    setPending(true)

    let data
    if (currentItem.action === 'update') data = await updateCategory(formValues)
    else data = await createCategory(formValues)

    if (data.error_type === 'validation') {
      setPending(false)
      return setErrors({
        name: data.message
      })
    } else if (data.error_type) {
      setPending(false)
      return showToast({
        title: data.message,
        type: 'error'
      })
    }
    showToast({
      title: currentItem.action === 'create' ? 'Category created' : 'Category updated',
      type: 'success'
    })
    setFormvalues({
      name: ''
    })
    setErrors({ name: null })
    setPending(false)
    router.refresh()
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.content}
      aria-label='Send category form'
    >
      <div className={styles.inputContent}>
        <label htmlFor='name'>Name</label>
        <Input
          required
          id='name'
          value={formValues.name}
          onChange={handleFormValues}
          autoComplete='off'
          placeholder='Category'
          type='text'
          minLength='2'
          className={styles.input}
        />
        <span
          className={`
          error
          ${errors.name === null ? 'hidden' : 'block'}
          `}
        >{errors.name}
        </span>
      </div>

      <DialogFooter onClose={onClose} pending={pending} />
    </form>
  )
}
