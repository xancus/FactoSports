from .. import dbs
from ..models import Product, Feature
from ..schemas.product import CreateProductDTO, UpdateProductDTO
from . import feature_controller, category_controller
from sqlalchemy.orm import joinedload

class CreateProductError(Exception):
  pass

class NoProductsFoundError(Exception):
  pass

def get_products():
  return Product.query.order_by(Product.id).all()

def get_product_by_id(id):
  return Product.query.options(joinedload(Product.features)
    .joinedload(Feature.feature_values)
  ).filter(Product.id == id).first()

def get_product_by_name(name):
  return Product.query.filter_by(name=name).first()

def get_product_by_img(img_src):
  return Product.query.filter_by(img_src=img_src).first()

def get_products_by_category(id):
  category = category_controller.check_exist_category(id, 'id')
  if not category: raise category_controller.NotFoundCategoryError

  return Product.query.filter_by(category_id=id).all()

def get_active_products_by_category(id):
  category = category_controller.check_exist_category(id, 'id')
  if not category: raise category_controller.NotFoundCategoryError

  return Product.query.filter_by(category_id=id, on_sale=True).all()

def get_active_products():
  return Product.query.filter_by(on_sale=True).all()

def delete_product(id):
  product = check_exist_product(id, by='id')
  if not product: raise NoProductsFoundError

  product.features.clear()
  dbs.session.delete(product)
  dbs.session.commit()
  return True

def update_product(product, update_product_data: UpdateProductDTO):
  updates = update_product_data.model_dump(exclude_unset=True)

  for key, value in updates.items():
    if key == "features" and update_product_data.features:
      features_to_add = add_features(update_product_data.features)

      if features_to_add is False: raise CreateProductError
      product.features = features_to_add
    else: setattr(product, key, value)

  dbs.session.commit()

  return product

def create_product(data: CreateProductDTO):
  if check_exist_product(data.name, by='name'): raise CreateProductError

  product = Product(
    name = data.name,
    description = data.description,
    price = data.price,
    on_sale = data.on_sale,
    category_id = data.category_id,
    img_src = data.img_src
  )
  features_to_add = add_features(data.features)
  if features_to_add is False: raise CreateProductError
  product.features = features_to_add

  dbs.session.add(product)
  dbs.session.commit()

  return product

def check_exist_img(img_src):
  if img_src != '': return get_product_by_img(img_src)
  return False

def check_exist_product(value, by='name'):
  if by == 'name': product = get_product_by_name(value)
  else: product = get_product_by_id(value)

  return product

def add_features(features):
  features_to_add = []

  if not features: return []
  else:
    for feature in features:
      current_feature = feature_controller.get_feature_by_id(feature.id)
      if current_feature: features_to_add.append(current_feature)
      else: return False
  
  return features_to_add
