import { productSchema } from '@/services/schemas'

export async function getAllProducts (active) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/product/all`)
  if (active) url.searchParams.append('active', true)

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error)
  }
  const data = await res.json()
  return data
}

export async function getAllProductsByCategory (id, active) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/product/by-category/${id}`)
  if (active) url.searchParams.append('active', true)
  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error)
  }
  const data = await res.json()
  return data
}

export async function createProduct (formData) {
  const { name, description, img_src, price, on_sale, category_id, features } = formData
  const checkFormData = {
    name,
    description,
    img_src,
    price,
    on_sale,
    category_id,
    features
  }

  const validatedData = productSchema.safeParse(checkFormData)
  if (!validatedData.success) {
    return {
      error_type: 'validation',
      message: validatedData.error.format().name?._errors
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/product/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedData.data)
    })

    const data = await res.json()
    if (!res.ok) {
      throw {
        error_type: 'backend',
        message: data.error || 'An unknown error occurred'
      }
    }
    return data
  } catch (e) {
    return {
      error_type: e.error_type || 'fetch',
      message: e.message || 'Something went wrong, please try again later'
    }
  }
}

export async function updateProduct (formData) {
  const { id, name, description, img_src, price, on_sale, category_id, features } = formData
  const checkFormData = {
    name,
    description,
    img_src,
    price,
    on_sale,
    category_id,
    features
  }

  const validatedData = productSchema.safeParse(checkFormData)
  if (!validatedData.success) {
    return {
      error_type: 'validation',
      message: validatedData.error.format().name?._errors
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/product/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedData.data)
    })

    const data = await res.json()
    if (!res.ok) {
      throw {
        error_type: 'backend',
        message: data.error || 'An unknown error occurred'
      }
    }
    return data
  } catch (e) {
    return {
      error_type: e.error_type || 'fetch',
      message: e.message || 'Something went wrong, please try again later'
    }
  }
}

export async function deleteProduct (id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/product/delete/${id}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error)
    }
    return data
  } catch (e) {
    return {
      error_type: e.error_type || 'fetch',
      message: e.message || 'Something went wrong, please try again later'
    }
  }
}

export async function getProduct (id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
    method: 'GET',
    cache: 'no-store'
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error)
  }
  const data = await res.json()
  return data
}
