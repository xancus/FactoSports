import { FeatureContent } from '@/components/features/FeatureContent'
import { getAllFeatures } from '@/services/feature'

export default async function FeaturesPage () {
  const features = await getAllFeatures()
  return (
    <FeatureContent features={features} />
  )
}
