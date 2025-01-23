'use client'
import { getAllCategoriesClient } from '@/services/category'
import { useEffect, useState } from 'react'

export function useCategories () {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getAllCategoriesClient()
      .then(data => setCategories(data))
      .catch(err => console.log(err))
  }, [])

  return { categories }
}
