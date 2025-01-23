from flask import Blueprint, jsonify, request
from ..database.controllers import feature_restriction_controller
from ..database.schemas.feature_restriction import CreateFeatureRestrictionDTO

feature_restriction = Blueprint('feature_restriction', __name__)

@feature_restriction.route('/all', methods=['GET'])
def get_all_restrictions():
  feature_restriction_data = feature_restriction_controller.get_feature_restrictions()
  feature_restrictions = [{
    'id': restriction.id,
    'restriction_id': restriction.restriction_feature_value_id,
    'dependent_restriction_id': restriction.dependent_restriction_feature_value_id
  } for restriction in feature_restriction_data]

  return jsonify(feature_restrictions), 200

@feature_restriction.route('/<int:id>', methods=['GET'])
def get_restriction_by_id(id):
  try:
    current_feature_restriction = feature_restriction_controller.get_feature_restriction_by_id(id)
    if not current_feature_restriction: raise feature_restriction_controller.NoFeatureRestrictionFoundError
    
    return jsonify({ 
      'id': current_feature_restriction.id,
      'restriction_id': current_feature_restriction.restriction_feature_value_id,
      'dependent_restriction_id': current_feature_restriction.dependent_restriction_feature_value_id
      
    }), 200

  except feature_restriction_controller.NoFeatureRestrictionFoundError:
      return jsonify({'error': f"Feature restriction with ID {id} not found"}), 404

@feature_restriction.route('/create', methods=['POST'])
def create_restriction():
  try:
    data = request.json
    feature_data = CreateFeatureRestrictionDTO(**data)
    feature_restriction_controller.create_feature_restrictions(feature_data)

    return jsonify({"message": "Feature restriction created successfully"}), 201
    
  except feature_restriction_controller.CreateFeatureRestrictionError:
    return jsonify({'error': 'Feature restriction already exists, please try with another feature value'}), 400
  
@feature_restriction.route('/delete/<int:id>', methods=['DELETE'])
def delete_restriction(id):
  try:
    feature_restriction_controller.delete_feature_restriction(id)

    return jsonify({"message": "Feature restriction deleted"}), 200
    
  except feature_restriction_controller.NoFeatureRestrictionFoundError:
    return jsonify({'error': "Feature restriction doesn't exist"}), 400