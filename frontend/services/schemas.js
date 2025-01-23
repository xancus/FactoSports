import z from 'zod'

export const categorySchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be 2 or more characters' })
    .max(100, { message: 'Must be less than 100 characters' })
})

export const productSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be 2 or more characters' })
    .max(100, { message: 'Must be less than 100 characters' }),
  img_src: z.optional(z.string()),
  description: z.optional(z.string().max(250)),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number'
  })
    .gt(0),
  on_sale: z.boolean({
    required_error: 'On sale is required'
  }),
  category_id: z.optional(z.number()),
  features: z.array(
    z.object({
      id: z.number(),
      name: z.string()
    })
  )
})

export const createFeatureSchema = z.object({
  feature: z.object({
    name: z.string()
      .min(2, { message: 'Name must be 2 or more characters' })
      .max(100, { message: 'Must be less than 100 characters' })
  }),
  feature_value: z.array(
    z.object({
      name: z.string()
        .min(2, { message: 'Name must be 2 or more characters' })
        .max(100, { message: 'Must be less than 100 characters' }),
      price: z.number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be greater than 0'
      })
        .gt(0),
      stock: z.number({
        required_error: 'Stock is required',
        invalid_type_error: 'Price must be a number'
      })
    })
  )
})

export const updateFeatureSchema = z.object({
  feature: z.object({
    name: z.string()
      .min(2, { message: 'Name must be 2 or more characters' })
      .max(100, { message: 'Must be less than 100 characters' })
  }),
  feature_value: z.array(
    z.object({
      id: z.number(),
      name: z.string()
        .min(2, { message: 'Name must be 2 or more characters' })
        .max(100, { message: 'Must be less than 100 characters' }),
      price: z.number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be greater than 0'
      })
        .gt(0),
      stock: z.number({
        required_error: 'Stock is required',
        invalid_type_error: 'Price must be a number'
      }),
      create: z.boolean()
    })
  )
})
