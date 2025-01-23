from .. import dbs
from ..models import Feature
from ..schemas.feature import CreateFeatureDTO
from sqlalchemy.orm import joinedload

class CreateFeatureError(Exception):
  pass

class NotFoundFeatureError(Exception):
  pass

def get_features():
  return Feature.query.order_by(Feature.id).all()

def get_feature_by_id(id):
  return Feature.query.filter_by(id=id).first()

def get_product_by_name(name):
  return Feature.query.filter_by(name=name).first()

def get_features_with_values():
  return Feature.query.options(joinedload(Feature.feature_values)).all()

def update_feature(feature, update_feature_data: CreateFeatureDTO):
  exist_feature = check_exist_feature(update_feature_data.name, 'name')
  if exist_feature: raise CreateFeatureError

  feature.name = update_feature_data.name
  dbs.session.commit()

  return feature

def create_feature(data: CreateFeatureDTO):
  feature = check_exist_feature(data.name, 'name')
  if feature: raise CreateFeatureError

  new_feature = Feature(name = data.name)
  dbs.session.add(new_feature)
  dbs.session.commit()

  return new_feature

def delete_feature(id):
  feature = check_exist_feature(id, 'id')
  if not feature: raise NotFoundFeatureError

  dbs.session.delete(feature)
  dbs.session.commit()
  
  return True

def check_exist_feature(value, by='name'):
  if by == 'name': feature = get_product_by_name(value)
  else: feature = get_feature_by_id(value)

  return feature
