from .. import dbs
from ..models import FeatureRestriction
from ..schemas.feature_restriction import CreateFeatureRestrictionDTO 
from sqlalchemy import or_

class CreateFeatureRestrictionError(Exception):
  pass

class NoFeatureRestrictionFoundError(Exception):
  pass

def get_feature_restrictions():
  return FeatureRestriction.query.all()

def get_feature_restriction_by_id(id):
  return FeatureRestriction.query.filter_by(id=id).first()

def get_feature_restrictions_by_id(id):
  return FeatureRestriction.query.filter_by(id=id).all()

def get_feature_restrictions_by_restriction_id(restriction_id):
  return FeatureRestriction.query.filter(
    or_(FeatureRestriction.restriction_feature_value_id == restriction_id,
    FeatureRestriction.dependent_restriction_feature_value_id == restriction_id)
  ).all()

def get_feature_restrictions_by_restriction_ids(all_restriction_ids):
  return FeatureRestriction.query.filter(
    or_(
      FeatureRestriction.restriction_feature_value_id.in_(all_restriction_ids),
      FeatureRestriction.dependent_restriction_feature_value_id.in_(all_restriction_ids)
    )
  ).all()

def delete_feature_restriction(id):
  restriction = get_feature_restriction_by_id(id)
  if not restriction: raise NoFeatureRestrictionFoundError

  dbs.session.delete(restriction)
  dbs.session.commit()
  return True

def create_feature_restrictions(data: CreateFeatureRestrictionDTO):
  restriction = get_feature_restrictions_by_restriction_id(data.restriction_feature_value_id)
  
  if restriction and any(i.dependent_restriction_feature_value_id == data.dependent_restriction_feature_value_id for i in restriction): raise CreateFeatureRestrictionError

  feature = FeatureRestriction(
    restriction_feature_value_id = data.restriction_feature_value_id,
    dependent_restriction_feature_value_id = data.dependent_restriction_feature_value_id
  )

  dbs.session.add(feature)
  dbs.session.commit()

  return feature