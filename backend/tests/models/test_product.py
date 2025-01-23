from app.database.models import Product
from app.database.schemas.product import CreateProductDTO, UpdateProductDTO
from app.database.controllers import product_controller
import pytest

def test_create_product(db):
  product_data = {
    "name": "Bicicleta test",
    "description": "Test de la descripció",
    "price": 2.2,
    "on_sale": True,
    "category_id": 1,
    "features": []
}
  product = CreateProductDTO(**product_data)
  new_product = product_controller.create_product(product)

  assert new_product.id is not None
  assert new_product.name == product_data['name']
  assert new_product.features is not None


def test_create_duplicate_product(db):
  product_data = {
    "name": "Bicicleta test",
    "description": "Test de la descripció",
    "price": 2.2,
    "on_sale": True,
    "category_id": 1,
    "features": []
  }
  
  product = CreateProductDTO(**product_data)
  product_controller.create_product(product)

  with pytest.raises(product_controller.CreateProductError):
    product_controller.create_product(product)

  assert Product.query.filter_by(name=product_data['name']).count() == 1

def test_update(db):
  product_name = 'test'
  product_data = {
    "name": "Bicicleta test",
    "description": "Test de la descripció",
    "price": 2.2,
    "on_sale": True,
    "category_id": 1,
    "features": []
  }
  
  product = CreateProductDTO(**product_data)
  new_product = product_controller.create_product(product)

  product_ = UpdateProductDTO(name = product_name)
  updated_product = product_controller.update_product(new_product, product_)

  assert updated_product.name == product_name
