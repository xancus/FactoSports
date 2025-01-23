from pydantic import BaseModel

class FeatureRestrictionDTO(BaseModel):
  id: int
  
class CreateFeatureRestrictionDTO(BaseModel):
  restriction_feature_value_id: int
  dependent_restriction_feature_value_id: int