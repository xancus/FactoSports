import { createFeatureSchema, updateFeatureSchema } from '@/services/schemas'

export async function getAllFeatures () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feature/all`, {
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

export async function getAllFeaturesClient () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/feature/all`, {
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

export async function createFeature (formData) {
  const validatedData = createFeatureSchema.safeParse(formData)

  if (!validatedData.success) {
    return {
      error_type: 'validation',
      error: {
        feature: validatedData.error.format().feature?.name?._errors,
        feature_value: Object.entries(validatedData.error.format().feature_value || {})
          .filter(([key]) => key !== '_errors')
          .map(([index, valueError]) => ({
            index: parseInt(index, 10),
            name: valueError?.name?._errors || [],
            price: valueError?.price?._errors || [],
            stock: valueError?.stock?._errors || []
          }))
      }
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/feature/create/all`, {
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

export async function updateFeature (formData) {
  const { id } = formData.feature
  const validatedData = updateFeatureSchema.safeParse(formData)

  if (!validatedData.success) {
    return {
      error_type: 'validation',
      error: {
        feature: validatedData.error.format().feature?.name?._errors,
        feature_value: Object.entries(validatedData.error.format().feature_value || {})
          .filter(([key]) => key !== '_errors')
          .map(([index, valueError]) => ({
            index: parseInt(index, 10),
            name: valueError?.name?._errors || [],
            price: valueError?.price?._errors || [],
            stock: valueError?.stock?._errors || []
          }))
      }
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/feature/update/${id}`, {
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

export async function deleteFeature (id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/feature/delete/${id}`, {
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
