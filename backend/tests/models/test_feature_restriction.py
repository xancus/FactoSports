from app.database.models import FeatureRestriction
from app.database.schemas.feature_restriction import CreateFeatureRestrictionDTO
from app.database.controllers import feature_restriction_controller
import pytest

def test_create_restriction(db):
  feature_data = {
    "restriction_feature_value_id": 6,
    "dependent_restriction_feature_value_id": 3
  }
  feature_value = CreateFeatureRestrictionDTO(**feature_data)
  new_feature_value = feature_restriction_controller.create_feature_restrictions(feature_value)

  assert new_feature_value.id is not None
  assert new_feature_value.restriction_feature_value_id == feature_data['restriction_feature_value_id']


def test_create_duplicate_restriction(db):
  feature_data = {
    "restriction_feature_value_id": 6,
    "dependent_restriction_feature_value_id": 3
  }
  
  feature_value = CreateFeatureRestrictionDTO(**feature_data)
  feature_restriction_controller.create_feature_restrictions(feature_value)

  with pytest.raises(feature_restriction_controller.CreateFeatureRestrictionError):
    feature_restriction_controller.create_feature_restrictions(feature_value)

  assert FeatureRestriction.query.filter_by(restriction_feature_value_id=feature_data['restriction_feature_value_id']).count() == 1

# intentar obtindre o accedir a uns valors de una feature que no son permesos per la restriccio
