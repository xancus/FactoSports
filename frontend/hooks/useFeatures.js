'use client'
import { getAllFeaturesClient } from '@/services/feature'
import { useEffect, useState } from 'react'

export function useFeatures () {
  const [features, setFeatures] = useState([])

  useEffect(() => {
    getAllFeaturesClient()
      .then(data => setFeatures(data))
      .catch(err => console.log(err))
  }, [])

  return { features }
}
