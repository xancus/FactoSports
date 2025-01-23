import { CategoryContent } from '@/components/categories/CategoryContent'
import { getAllCategories } from '@/services/category'

export default async function CategoriesPage () {
  const categories = await getAllCategories()
  return (
    <div>
      <CategoryContent categories={categories} />
    </div>
  )
}
