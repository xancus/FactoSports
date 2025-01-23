from .. import dbs
from ..models import FeatureValue
from ..schemas.feature_value import CreateFeatureValueDTO, UpdateFeatureValueDTO

class CreateFeaturevalueError(Exception):
  pass

class NoFeatureValuesFoundError(Exception):
  pass

def check_exist_value(value, by='feature'):
  if by == 'feature':
    feature_value = FeatureValue.query.filter_by(name=value.name, feature_id=value.feature_id).first()
  else: feature_value = get_feature_value_by_id(value)

  return feature_value

def get_feature_values():
  return FeatureValue.query.all()

def get_feature_value_by_id(id):
  return FeatureValue.query.filter_by(id=id).first()

def get_feature_value_by_name(name):
  return FeatureValue.query.filter_by(name=name).first()

def delete_feature_values(id):
  feature_value = check_exist_value(id, by='id')
  if not feature_value: raise NoFeatureValuesFoundError

  dbs.session.delete(feature_value)
  dbs.session.commit()
  return True

def delete_feature_values_by_feature_id(feature_id):
  dbs.session.query(FeatureValue).filter_by(feature_id=feature_id).delete()
  dbs.session.commit()
  return True

def update_feature_values(update_feature_value: UpdateFeatureValueDTO):
  dbs.session.bulk_update_mappings(FeatureValue, update_feature_value)
  dbs.session.commit()
  return True

def create_feature_values(data: CreateFeatureValueDTO):
  if check_exist_value(data, by='feature'): raise CreateFeaturevalueError

  feature = FeatureValue(
    name = data.name,
    price = data.price,
    stock = data.stock,
    feature_id = data.feature_id
  )

  dbs.session.add(feature)
  dbs.session.commit()

  return feature

def get_all_feature_value_by_feature_id(feature_id):
  return FeatureValue.query.filter_by(feature_id=feature_id).all()