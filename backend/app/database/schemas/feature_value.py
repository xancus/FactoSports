from pydantic import BaseModel, condecimal, constr
from typing import Optional

class FeatureValueDTO(BaseModel):
  id: int

class CreateFeatureValueDTO(BaseModel):
  name: constr(min_length=1, max_length=100)
  price: condecimal(ge=0)
  stock: int
  feature_id: int

class UpdateFeatureValueDTO(FeatureValueDTO):
  name: constr(min_length=1, max_length=100)
  price: condecimal(ge=0)
  stock: int
  feature_id: int