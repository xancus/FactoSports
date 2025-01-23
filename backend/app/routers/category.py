from flask import Blueprint, jsonify, request
from ..database.controllers import category_controller
from ..database.schemas.category import CategoryDTO

category = Blueprint('category', __name__)

@category.route('/all', methods=['GET'])
def get_all_categories():
  categories_data = category_controller.get_categories()
  categories = [{
    'id': cat.id,
    'name': cat.name
  } for cat in categories_data]

  return jsonify(categories), 200

@category.route('/<int:id>', methods=['GET'])
def get_category_by_id(id):
  try:
    current_category = category_controller.get_category_by_id(id)
    if not current_category: raise category_controller.NotFoundCategoryError
    
    return jsonify({ 
      'id': current_category.id,
      'name': current_category.name
    }), 200
  except category_controller.NotFoundCategoryError:
    return jsonify({'error': f"Category with ID {id} not found"}), 404

@category.route('/create', methods=['POST'])
def create_category():
  try:
    data = request.json
    category_data = CategoryDTO(**data)
    category_controller.create_category(category_data)

    return jsonify({"message": "Category created successfully"}), 201
    
  except category_controller.CreateCategoryError:
    return jsonify({'error': 'Category already exists, please try with another name'}), 400
  
@category.route('/delete/<int:id>', methods=['DELETE'])
def delete_category(id):
  try:
    category_controller.delete_category(id)

    return jsonify({"message": "Category deleted"}), 200
    
  except category_controller.NotFoundCategoryError:
    return jsonify({'error': "Category doesn't exist"}), 400
  
@category.route('/update/<int:id>', methods=['PUT'])
def update_category(id):
  try:
    current_category = category_controller.get_category_by_id(id)
    if not current_category: raise category_controller.NotFoundCategoryError

    data = request.json
    category_data = CategoryDTO(**data)
    category_controller.update_category(current_category, category_data)

    return jsonify({"message": "Category updated successfully"}), 200
    
  except category_controller.NotFoundCategoryError:
    return jsonify({'error': "Category doesn't exist"}), 400
