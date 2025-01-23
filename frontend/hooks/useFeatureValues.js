'use client'
import { getAllFeatureValuesClient } from '@/services/feature_value'
import { useEffect, useState } from 'react'

export function useFeatureValues () {
  const [featureValues, setFeatureValues] = useState([])

  useEffect(() => {
    getAllFeatureValuesClient()
      .then(data => setFeatureValues(data))
      .catch(err => console.log(err))
  }, [])

  return { featureValues }
}
