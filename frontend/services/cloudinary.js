export async function uploadImage (formData) {
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    if (!res.ok) {
      throw {
        error_type: 'cloudinary',
        message: 'Error uploading image, please try again later'
      }
    }
    return data
  } catch (e) {
    return {
      error_type: 'cloudinary',
      message: e.message || 'Something went wrong, uploading the image please try again later'
    }
  }
}
