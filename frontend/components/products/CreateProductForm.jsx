'use client'
import { ArrowdownIcon } from '@/components/icons/ArrowDownIcon'
import { CheckList } from '@/components/ui/CheckList'
import { createProduct, updateProduct } from '@/services/product'
import { DialogFooter } from '@/components/ui/DialogFooter'
import { Input } from '@/components/ui/Input'
import { showToast } from '@/components/ui/Toast'
import { ToggleButton } from '@/components/ui/ToggleButton'
import { uploadImage } from '@/services/cloudinary'
import { useCategories } from '@/hooks/useCategories'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useFeatures } from '@/hooks/useFeatures'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import iconStyles from '@/css/Icons.module.css'
import styles from '@/css/components/Form.module.css'

const INITIAL_FORM_VALUES = {
  name: '',
  description: '',
  image: {
    data: '',
    name: ''
  },
  price: 1,
  on_sale: false,
  category_id: '',
  features: []
}

export function CreateProductForm ({ onClose, currentItem }) {
  const router = useRouter()
  const { categories } = useCategories()
  const { features } = useFeatures()
  const [pending, setPending] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [formValues, setFormvalues] = useState({
    ...INITIAL_FORM_VALUES,
    category_id: categories[0]?.id || ''
  })
  const [errors, setErrors] = useState({
    name: ''
  })
  const listRef = useRef(null)
  useClickOutside(listRef, () => setShowDropdown(false))

  useEffect(() => {
    if (!currentItem.item) return

    setFormvalues(prev => ({
      ...prev,
      ...currentItem.item,
      image: {
        ...prev.image,
        ...currentItem.item.image
      }
    }))
  }, [currentItem.item])

  function resetFormValues () {
    setFormvalues({
      ...INITIAL_FORM_VALUES,
      category_id: categories[0]?.id || ''
    })
    setErrors({ name: '' })
    setPending(false)
  }

  function handleImage (ev) {
    const files = ev.target.files[0]
    const data = new FormData()
    data.append('file', files)
    data.append('upload_preset', process.env.NEXT_PUBLIC_PRESET_NAME)

    setFormvalues(prev => ({
      ...prev,
      image: { data, name: files.name }
    }))
  }

  function handleFormValues (ev, feature) {
    if (feature) {
      return setFormvalues((prev) => {
        const exists = prev.features.some(f => f.id === feature.id)
        return ({
          ...prev,
          features: exists
            ? prev.features.filter(f => f.id !== feature.id)
            : [...prev.features, feature]
        })
      })
    }

    const { value, name } = ev.target
    const type = (name === 'price' || name === 'category_id') ? 'number' : 'string'
    setFormvalues(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  async function handleSubmit (event) {
    event.preventDefault()

    setPending(true)
    let img_data = ''
    if (formValues.image.data) {
      img_data = await uploadImage(formValues.image.data)
      if (img_data.error_type) {
        setPending(false)
        setErrors({
          name: ''
        })
        showToast({
          title: img_data.message,
          type: 'error'
        })
        return
      }
    }

    let data
    const formData = { ...formValues, img_src: img_data?.secure_url }

    if (currentItem.action === 'update') data = await updateProduct(formData)
    else data = await createProduct(formData)

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
      title: currentItem.action === 'create' ? 'Product created' : 'Product updated',
      type: 'success'
    })
    resetFormValues()
    router.refresh()
    onClose()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.content}
      aria-label='Send product form'
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
          placeholder='Product name'
          type='text'
          className={styles.input}
        />
        <span
          className={`
          error
          ${errors.name === '' ? 'hidden' : 'block'}
          `}
        >{errors.name}
        </span>
      </div>
      <div className={styles.inputContent}>
        <label htmlFor='description'>Description</label>
        <Input
          id='description'
          value={formValues.description}
          name='description'
          onChange={handleFormValues}
          autoComplete='off'
          placeholder='Product description'
          type='text'
          className={styles.input}
        />
      </div>
      <div className={styles.inputContent}>
        <label htmlFor='image'>Select an image</label>
        <Input
          name='file'
          id='image'
          onChange={handleImage}
          type='file'
          className={styles.input}
          accept='image/png, image/jpeg'
        />
        <span
          className={`
          error
          ${errors.image === '' ? 'hidden' : 'block'}
          `}
        >{errors.image}
        </span>
      </div>
      <div className={styles.inputShort}>
        <label htmlFor='price'>Price</label>
        <Input
          required
          id='price'
          value={Number(formValues.price)}
          name='price'
          onChange={handleFormValues}
          min={1}
          type='number'
          className={styles.input}
        />
      </div>

      <div className={styles.inputContent}>
        <label htmlFor='category'>Category</label>
        <select
          required
          id='category'
          value={formValues.category_id || ''}
          name='category_id'
          className={styles.input}
          onChange={handleFormValues}
        >
          <option disabled value=''>Select category</option>
          {categories.map(cat => (
            <option value={cat.id} key={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div style={{ width: 'fit-content' }} className={styles.inputContent} ref={listRef}>
        <label
          className={styles.label}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Features
          <i role='button'>
            <ArrowdownIcon cls={iconStyles.midIcon} width={16} height={16} />
          </i>
        </label>
        <CheckList
          handleChange={handleFormValues}
          show={showDropdown}
          items={features}
          name='features'
          checkItems={formValues.features}
        />
      </div>

      <div className={styles.inputContent}>
        <label>On sale</label>
        <ToggleButton
          handleToggle={() => setFormvalues((prev) => ({
            ...prev,
            on_sale: !formValues.on_sale
          }))}
          isChecked={formValues.on_sale === true}
          name='on_sale'
        />
      </div>

      <DialogFooter onClose={onClose} pending={pending} />
    </form>
  )
}
