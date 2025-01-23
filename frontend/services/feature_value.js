export async function getFeaturesValueByFeature (id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feature_value/all/${id}`, {
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

export async function getAllFeatureValuesClient () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/feature_value/all`, {
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

export async function getRestrictedFeatureValues (id, prevIds) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ID}/feature_value/all/restricted/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prevIds: prevIds || []
    })
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error)
  }
  const data = await res.json()
  return data
}
