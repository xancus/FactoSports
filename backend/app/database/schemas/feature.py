from pydantic import BaseModel, constr
from typing import Optional


class FeatureDTO(BaseModel):
  id: int
  name: str

class CreateFeatureDTO(BaseModel):
  name: constr(min_length=1, max_length=100)

class UpdateFeatureDTO(BaseModel):
  name: Optional[constr(min_length=1, max_length=100)]