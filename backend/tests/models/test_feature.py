from app.database.models import Feature
from app.database.schemas.feature import CreateFeatureDTO
from app.database.schemas.feature_value import CreateFeatureValueDTO
from app.database.controllers import feature_controller, feature_value_controller
import pytest

def test_create_feature(db):
  feature_name = 'test'
  feature = CreateFeatureDTO(name = feature_name)
  new_feature = feature_controller.create_feature(feature)

  assert new_feature.id is not None
  assert new_feature.name == feature_name


def test_create_duplicate_feature(db):
  feature_name = 'test'
  
  feature = CreateFeatureDTO(name = feature_name)
  feature_controller.create_feature(feature)

  with pytest.raises(feature_controller.CreateFeatureError):
    feature_controller.create_feature(feature)

  assert Feature.query.filter_by(name=feature_name).count() == 1

def test_update(db):
  feature_name = 'test'
  
  feature = CreateFeatureDTO(name = feature_name)
  feature_ = feature_controller.create_feature(feature)

  feature_data = {
    "name": "TEst",
    "price": 2.2,
    "stock": 10,
    "feature_id": 1
  }
  feature_value = CreateFeatureValueDTO(**feature_data)
  feature_value_controller.create_feature_values(feature_value)

  data = {
    'feature': {'name': 'test'},
    'feature_value': [{'name': 'test1', 'price': 1, 'stock': 2}]
  }

  feature_value_controller.delete_feature_values_by_feature_id(feature_.id)
  for feature_value_ in data['feature_value']:
    feature_value_['feature_id'] = feature_.id
    feature_value_data = CreateFeatureValueDTO(**feature_value_)
    feature_value_controller.create_feature_values(feature_value_data)

  res = feature_value_controller.get_all_feature_value_by_feature_id(feature_.id)
  
  assert res[0].name == data['feature_value'][0]['name']