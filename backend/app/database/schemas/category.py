from pydantic import BaseModel, constr

class CategoryDTO(BaseModel):
  name: constr(min_length=1, max_length=100)
