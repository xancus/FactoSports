from app.database.models import Category
from app.database.schemas.category import CategoryDTO
from app.database.controllers import category_controller
import pytest

def test_create_category(db):
  category_name = 'Bike'
  category = CategoryDTO(name=category_name)
  new_category = category_controller.create_category(category)

  assert new_category.id is not None
  assert new_category.name == category_name


def test_create_duplicate_category(db):
  category_name = 'Bike'
  category = CategoryDTO(name=category_name)
  category_controller.create_category(category)

  with pytest.raises(category_controller.CreateCategoryError):
    category_controller.create_category(category)

  assert Category.query.filter_by(name=category_name).count() == 1

def test_update(db):
  category_name = 'test'
  cat_to_update = 'test_name'
  
  category = CategoryDTO(name = category_name)
  category_ = CategoryDTO(name = cat_to_update)
  new_category = category_controller.create_category(category)

  updated_category = category_controller.update_category(new_category, category_)
  
  assert updated_category.name == cat_to_update
