from app.database.models import FeatureValue
from app.database.schemas.feature_value import CreateFeatureValueDTO
from app.database.controllers import feature_value_controller
import pytest

def test_create_feature(db):
  feature_data = {
    "name": "TEst",
    "price": 2.2,
    "stock": 10,
    "feature_id": 1
  }
  feature_value = CreateFeatureValueDTO(**feature_data)
  new_feature_value = feature_value_controller.create_feature_values(feature_value)

  assert new_feature_value.id is not None
  assert new_feature_value.name == feature_data['name']

def test_create_same_feature_value_different_feature(db):
  feature_data = {
    "name": "TEst",
    "price": 2.2,
    "stock": 10,
    "feature_id": 1
  }
  feature_data2 = {
    "name": "TEst",
    "price": 2.2,
    "stock": 10,
    "feature_id": 2
  }
  
  feature_value = CreateFeatureValueDTO(**feature_data)
  feature_value_controller.create_feature_values(feature_value)

  feature_value2 = CreateFeatureValueDTO(**feature_data2)
  feature_value_controller.create_feature_values(feature_value2)

  assert FeatureValue.query.filter_by(name=feature_data['name']).count() == 2



def test_create_duplicate_feature(db):
  feature_data = {
    "name": "TEst",
    "price": 2.2,
    "stock": 10,
    "feature_id": 1
  }
  
  feature_value = CreateFeatureValueDTO(**feature_data)
  feature_value_controller.create_feature_values(feature_value)

  with pytest.raises(feature_value_controller.CreateFeaturevalueError):
    feature_value_controller.create_feature_values(feature_value)

  assert FeatureValue.query.filter_by(name=feature_data['name']).count() == 1
