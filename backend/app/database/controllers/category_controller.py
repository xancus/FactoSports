from .. import dbs
from ..models import Category
from ..schemas.category import CategoryDTO

class CreateCategoryError(Exception):
  pass

class NotFoundCategoryError(Exception):
  pass

def get_categories():
  return Category.query.all()

def get_category_by_id(id):
  return Category.query.filter_by(id=id).first()

def get_category_by_name(name):
  return Category.query.filter_by(name=name).first()

def delete_category(id):
  category = check_exist_category(id, by='id')
  if not category: raise NotFoundCategoryError

  dbs.session.delete(category)
  dbs.session.commit()
  return True

def create_category(data: CategoryDTO):
  if check_exist_category(data.name, by='name'): raise CreateCategoryError

  category = Category(name = data.name)
  dbs.session.add(category)
  dbs.session.commit()

  return category

def update_category(category, update_category_data: CategoryDTO):
  category.name = update_category_data.name
  dbs.session.commit()

  return category

def check_exist_category(value, by='name'):
  if by == 'name': category = get_category_by_name(value)
  else: category = get_category_by_id(value)

  return category