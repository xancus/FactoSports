from flask import Blueprint, jsonify, request
from ..database.controllers import product_controller, category_controller, feature_controller
from ..database.schemas.product import CreateProductDTO, UpdateProductDTO

product = Blueprint('product', __name__)

@product.route('/all', methods=['GET'])
def get_all_products():
    query = request.args.get('active')
    if query: product_data = product_controller.get_active_products()
    else: product_data = product_controller.get_products()
    if not product_data: return jsonify(product_data), 200

    products = [{
      'id': prod.id,
      'name': prod.name,
      'description': prod.description,
      'img_src': prod.img_src,
      'price': prod.price,
      'on_sale': prod.on_sale,
      'category_id': prod.category_id,
      'features': [{
        'id': f.id,
        'name': f.name
      } for f in prod.features]
    } for prod in product_data]

    return jsonify(products), 200

@product.route('/create', methods=['POST'])
def create_product():
  try:
    data = request.json
    product_data = CreateProductDTO(**data)
    product_controller.create_product(product_data)
    return jsonify({"message": "Product created successfully"}), 201

  except product_controller.CreateProductError:
    return jsonify({'error': 'Product already exists, please try with another name'}), 400
  
@product.route('/update/<int:id>', methods=['PUT'])
def update_product(id):
  try:
    current_product = product_controller.get_product_by_id(id)
    if not current_product: raise product_controller.NoProductsFoundError

    data = request.json
    product_data = UpdateProductDTO(**data)
    product_controller.update_product(current_product, product_data)
    return jsonify({"message": "Product updated successfully"}), 201

  except product_controller.NoProductsFoundError:
    return jsonify({'error': 'Product not found'}), 400

@product.route('/delete/<int:id>', methods=['DELETE'])
def delete_product(id):
  try:
    product_controller.delete_product(id)
    return jsonify({"message": "Product deleted"}), 200
    
  except product_controller.NoProductsFoundError:
    return jsonify({'error': "Product doesn't exist"}), 400
  
@product.route('/<int:id>', methods=['GET'])
def get_product_by_id(id):
  try:
    current_product = product_controller.get_product_by_id(id)
    if not current_product: raise product_controller.NoProductsFoundError
    
    return jsonify({
      'id': current_product.id,
      'name': current_product.name,
      'description': current_product.description,
      'img_src': current_product.img_src,
      'price': current_product.price,
      'on_sale': current_product.on_sale,
      'category_id': current_product.category_id,
      'features': [{
        'id': f.id,
        'name': feature_controller.get_feature_by_id(f.id).name,
        'feature_values': [
          {
            'id': fv.id,
            'name': fv.name,
            'price': float(fv.price),
            'stock': fv.stock
          }
          for fv in f.feature_values
        ]
} for f in current_product.features]
    }), 200

  except product_controller.NoProductsFoundError:
    return jsonify({'error': f"Product with ID {id} not found"}), 404
  
@product.route('/by-category/<int:category_id>', methods=['GET'])
def get_product_by_category(category_id):
  try:
    
    query = request.args.get('active')
    if query: all_products = product_controller.get_active_products_by_category(category_id)
    else: all_products = product_controller.get_products_by_category(category_id)
    
    
    if not all_products: return jsonify(all_products), 200

    products = [{
      'id': current_product.id,
      'name': current_product.name,
      'description': current_product.description,
      'img_src': current_product.img_src,
      'price': current_product.price,
      'on_sale': current_product.on_sale,
      'category_id': current_product.category_id,
      'features': [{
        'id': f.id,
        'name': f.name
      } for f in current_product.features],
    } for current_product in all_products]
    
    return jsonify(products), 200

  except category_controller.NotFoundCategoryError:
    return jsonify({'error': f'Category with ID {category_id} not found'})
  
@product.route('/features/<int:id>', methods=['GET'])
def get_features(id):
  try:
    current_product = product_controller.get_product_by_id(id)
    if not current_product: raise product_controller.NoProductsFoundError

    
    productFeatures = [{
        'id': f.id,
        'name': f.name
      } for f in current_product.features]
    return jsonify(productFeatures), 200

  except product_controller.NoProductsFoundError:
    return jsonify({'error': f'Product not found'}), 404