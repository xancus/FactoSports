from pydantic import BaseModel, condecimal, constr
from typing import Optional, List
from .feature import FeatureDTO

class ProductDTO(BaseModel):
  id: int

class CreateProductDTO(BaseModel):
  name: constr(min_length=1, max_length=100)
  description: str
  img_src: Optional[str] = ""
  price: condecimal(ge=0, decimal_places=2)
  on_sale: bool
  category_id: int
  features: Optional[List[FeatureDTO]] = []

class UpdateProductDTO(BaseModel):
  name: Optional[constr(min_length=1, max_length=100)] =''
  description: Optional[str] = ''
  img_src: Optional[str] = ''
  price: Optional[condecimal(ge=0)] = 1
  on_sale: Optional[bool] = False
  category_id: Optional[int] = None
  features: Optional[List[FeatureDTO]] = []
