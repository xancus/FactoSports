from ..database.controllers import category_controller, product_controller, feature_controller, feature_value_controller, feature_restriction_controller
from ..database.schemas import category, product, feature, feature_value, feature_restriction

def initialize_data():
  try:
    # init category
    new_category = category.CategoryDTO(name='Bikes')
    category_controller.create_category(new_category)

    # init feature
    create_features()

    # init feature value
    create_feature_values()

    # init restrictions
    create_restrictions()

    # init product
    create_products()

  except Exception as e:
    print(f"Error loading initial data: {e}")

def create_restrictions():
  r1 = feature_restriction.CreateFeatureRestrictionDTO(
    restriction_feature_value_id = 7,
    dependent_restriction_feature_value_id = 2
  )
  feature_restriction_controller.create_feature_restrictions(r1)

  r2 = feature_restriction.CreateFeatureRestrictionDTO(
    restriction_feature_value_id = 7,
    dependent_restriction_feature_value_id = 3
  )
  feature_restriction_controller.create_feature_restrictions(r2)

  r3 = feature_restriction.CreateFeatureRestrictionDTO(
    restriction_feature_value_id = 8,
    dependent_restriction_feature_value_id = 9
  )
  feature_restriction_controller.create_feature_restrictions(r3)

  r4 = feature_restriction.CreateFeatureRestrictionDTO(
    restriction_feature_value_id = 7,
    dependent_restriction_feature_value_id = 12
  )
  feature_restriction_controller.create_feature_restrictions(r4)


def create_feature_values():
  fv1 = feature_value.CreateFeatureValueDTO(
      name='Full-suspension',
      price= 100,
      stock=100,
      feature_id = 1
    )
  feature_value_controller.create_feature_values(fv1)

  fv2 = feature_value.CreateFeatureValueDTO(
      name='Diamond',
      price= 75,
      stock=50,
      feature_id = 1
    )
  feature_value_controller.create_feature_values(fv2)

  fv3 = feature_value.CreateFeatureValueDTO(
      name='Step-through',
      price= 90,
      stock=440,
      feature_id = 1
    )
  feature_value_controller.create_feature_values(fv3)

  fv4 = feature_value.CreateFeatureValueDTO(
      name='Matte',
      price= 45,
      stock=300,
      feature_id = 2
    )
  feature_value_controller.create_feature_values(fv4)

  fv5 = feature_value.CreateFeatureValueDTO(
      name='Shiny',
      price= 35,
      stock=250,
      feature_id = 2
    )
  feature_value_controller.create_feature_values(fv5)

  fv6 = feature_value.CreateFeatureValueDTO(
      name='Road wheels',
      price= 10,
      stock=150,
      feature_id = 3
    )
  feature_value_controller.create_feature_values(fv6)

  fv7 = feature_value.CreateFeatureValueDTO(
      name='Mountain wheels',
      price= 10,
      stock=100,
      feature_id = 3
    )
  feature_value_controller.create_feature_values(fv7)

  fv8 = feature_value.CreateFeatureValueDTO(
      name='Fat bike wheels',
      price= 10,
      stock=600,
      feature_id = 3
    )
  feature_value_controller.create_feature_values(fv8)

  fv9 = feature_value.CreateFeatureValueDTO(
      name='Red',
      price= 10,
      stock=700,
      feature_id = 4
    )
  feature_value_controller.create_feature_values(fv9)

  fv10 = feature_value.CreateFeatureValueDTO(
      name='Blue',
      price= 10,
      stock=900,
      feature_id = 4
    )
  feature_value_controller.create_feature_values(fv10)

  fv11 = feature_value.CreateFeatureValueDTO(
      name='Black',
      price= 10,
      stock=1000,
      feature_id = 4
    )
  feature_value_controller.create_feature_values(fv11)

  fv12 = feature_value.CreateFeatureValueDTO(
      name='Single-speed chain',
      price= 10,
      stock=250,
      feature_id = 5
    )
  feature_value_controller.create_feature_values(fv12)

  fv13 = feature_value.CreateFeatureValueDTO(
      name='8-speed chain',
      price= 10,
      stock=300,
      feature_id = 5
    )
  feature_value_controller.create_feature_values(fv13)


def create_features():
  f1 = feature.CreateFeatureDTO(
      name='Frame type',
    )
  feature_controller.create_feature(f1)

  f2 = feature.CreateFeatureDTO(
      name='Frame finish',
    )
  feature_controller.create_feature(f2)

  f3 = feature.CreateFeatureDTO(
      name='Wheels',
    )
  feature_controller.create_feature(f3)

  f4 = feature.CreateFeatureDTO(
      name='Rim color',
    )
  feature_controller.create_feature(f4)

  f5 = feature.CreateFeatureDTO(
      name='Chain',
    )
  feature_controller.create_feature(f5)


def create_products():
  features = feature_controller.get_features()
  p1 = product.CreateProductDTO(
    name='City Glide',
    description='Comfortable, smooth, urban ride',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306514/ubike1_h4gty0.webp',
    price = 100,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p1)

  p2 = product.CreateProductDTO(
    name='Urban Volt',
    description='Touring bike',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306460/ubike_yucuho.webp',
    price = 100,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p2)

  p3 = product.CreateProductDTO(
    name='Mountain Quest',
    description='Built for tough mountain trails.',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306189/mbike2_r6ylnr.webp',
    price = 200,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p3)

  p4 = product.CreateProductDTO(
    name='Speed Racer',
    description='Fast, lightweight, road performance bike',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306188/rbike1_nxmbrp.webp',
    price = 200,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p4)

  p5 = product.CreateProductDTO(
    name='Trail Blazer',
    description=' Rugged mountain bike for exploration',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306187/mbike1_yzdaiq.webp',
    price = 150,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p5)

  p6 = product.CreateProductDTO(
    name='Urban Spark',
    description='Electric folding bike for city.',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306187/pbike2_pnypcp.webp',
    price = 150,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p6)

  p7 = product.CreateProductDTO(
    name='Roadmaster',
    description='Designed for swift road cycling',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306187/rbike2_sl05xo.webp',
    price = 300,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p7)

  p8 = product.CreateProductDTO(
    name='Volt Extreme',
    description='Powerful electric mountain adventure bike.',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306186/embike2_g0lie2.webp',
    price = 300,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p8)

  p9 = product.CreateProductDTO(
    name='Fold & Go',
    description='Compact, portable, electric folding bike.',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737306186/pbike1_orxk3p.webp',
    price = 400,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p9)

  p10 = product.CreateProductDTO(
    name='Peak Rider',
    description='Conquer mountains with electric power.',
    img_src='https://res.cloudinary.com/dj7zyx57u/image/upload/v1737305291/embike1_miz7ff.webp',
    price = 400,
    on_sale=True,
    category_id=1,
    features= [{
      'id': f.id,
      'name': f.name
    } for f in features]
  )
  product_controller.create_product(p10)
