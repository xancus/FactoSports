from flask import Blueprint, jsonify, request
from ..database.controllers import feature_value_controller, feature_restriction_controller, feature_controller
from ..database.schemas.feature_value import CreateFeatureValueDTO
from ..utils.check_restriction import allowed_restrictions

feature_value = Blueprint('feature_value', __name__)

@feature_value.route('/all', methods=['GET'])
def get_all_values():
  feature_value_data = feature_value_controller.get_feature_values()
  feature_values = [{
    'id': f.id,
    'name': f.name,
    'price': f.price,
    'stock': f.stock,
    'feature': feature_controller.get_feature_by_id(f.feature_id).name
  } for f in feature_value_data]

  return jsonify(feature_values), 200

@feature_value.route('/<int:id>', methods=['GET'])
def get_feature_value_by_id(id):
  try:
    current_feature_value = feature_value_controller.get_feature_value_by_id(id)
    if not current_feature_value: raise feature_value_controller.NoFeatureValuesFoundError
    
    return jsonify({ 
      'id': current_feature_value.id,
      'name': current_feature_value.name,
      'stock': current_feature_value.stock,
      'price': current_feature_value.price
    }), 200

  except feature_value_controller.NoFeatureValuesFoundError:
      return jsonify({'error': f"Feature value with ID {id} not found"}), 404

@feature_value.route('/create', methods=['POST'])
def create_feature_value():
  try:
    data = request.json
    feature_data = CreateFeatureValueDTO(**data)
    feature_value_controller.create_feature_values(feature_data)

    return jsonify({"message": "Feature created successfully"}), 201
    
  except feature_value_controller.CreateFeaturevalueError:
    return jsonify({'error': 'Feature value already exists, please try with another name'}), 400
  
@feature_value.route('/delete/<int:id>', methods=['DELETE'])
def delete_feature_value(id):
  try:
    feature_value_controller.delete_feature_values(id)

    return jsonify({"message": "Feature value deleted"}), 200
    
  except feature_value_controller.NoFeatureValuesFoundError:
    return jsonify({'error': "Feature value doesn't exist"}), 400
  
@feature_value.route('/all/<int:feature_id>', methods=['GET'])
def get_all_values_by_feature_id(feature_id):
  feature_values_data = feature_value_controller.get_all_feature_value_by_feature_id(feature_id)
  feature_name = feature_controller.get_feature_by_id(feature_id).name

  feature_values = [{
    'id': f.id,
    'name': f.name,
    'price': f.price,
    'stock': f.stock,
    'feature': feature_name
  } for f in feature_values_data]

  return jsonify(feature_values), 200

@feature_value.route('/all/restricted/<int:feature_id>', methods=['POST'])
def get_all_values_restricted(feature_id):
  prev_ids = request.json['prevIds']
  prev_ids.append(feature_id)
  
  current_restrictions = feature_restriction_controller.get_feature_restrictions_by_restriction_ids(prev_ids)

  feature_value_data = feature_value_controller.get_feature_values()

  if current_restrictions:
    feature_values = allowed_restrictions(feature_value_data, current_restrictions)

    for prev_id in prev_ids:
      prev_feature_value = feature_value_controller.get_feature_value_by_id(prev_id)
      if prev_feature_value not in feature_values:
        feature_values.append(prev_feature_value)

    feature_values = sorted(feature_values, key=lambda f: f.id)

    return jsonify([{
      'id': f.id,
      'name': f.name,
      'price': f.price,
      'stock': f.stock,
      'feature': feature_controller.get_feature_by_id(f.feature_id).name
    } for f in feature_values]), 200
  else:
    feature_values = sorted(feature_value_data, key=lambda f: f.id)
    feature_values = [{
      'id': f.id,
      'name': f.name,
      'price': f.price,
      'stock': f.stock,
      'feature': feature_controller.get_feature_by_id(f.feature_id).name
    } for f in feature_values]
  
  return jsonify(feature_values), 200
