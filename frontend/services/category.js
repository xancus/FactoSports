import { categorySchema } from '@/services/schemas'

export async function getAllCategories () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/all`, {
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

export async function getAllCategoriesClient () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/category/all`, {
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

export async function createCategory (formData) {
  const validatedData = categorySchema.safeParse(formData)
  if (!validatedData.success) {
    return {
      error_type: 'validation',
      message: validatedData.error.format().name?._errors
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/category/create`, {
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

export async function updateCategory (formData) {
  const { id } = formData
  const validatedData = categorySchema.safeParse(formData)
  if (!validatedData.success) {
    return {
      error_type: 'validation',
      message: validatedData.error.format().name?._errors
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/category/update/${id}`, {
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

export async function deleteCategory (id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/category/delete/${id}`, {
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
