from flask import Blueprint, jsonify, request
from ..database.controllers import feature_controller, feature_value_controller
from ..database.schemas.feature import CreateFeatureDTO, UpdateFeatureDTO
from ..database.schemas.feature_value import CreateFeatureValueDTO, UpdateFeatureValueDTO

feature = Blueprint('feature', __name__)

@feature.route('/all', methods=['GET'])
def get_all_features():
  features_data = feature_controller.get_features_with_values()
  features = [{
    'id': f.id,
    'name': f.name,
    'feature_values': [{
      'id': fv.id,
      'name': fv.name,
      'price': fv.price,
      'stock': fv.stock
      } for fv in f.feature_values]
  } for f in features_data]

  return jsonify(features), 200

@feature.route('/<int:id>', methods=['GET'])
def get_feature_by_id(id):
  try:
    current_feature = feature_controller.get_feature_by_id(id)
    if not current_feature: raise feature_controller.NotFoundFeatureError
    
    return jsonify({ 
      'id': current_feature.id,
      'name': current_feature.name
    }), 200
  except feature_controller.NotFoundFeatureError:
    return jsonify({'error': f"Feature with ID {id} not found"}), 404

@feature.route('/create', methods=['POST'])
def create_feature():
  try:
    data = request.json
    feature_data = CreateFeatureDTO(**data)
    feature_controller.create_feature(feature_data)

    return jsonify({"message": "Feature created successfully"}), 201
    
  except feature_controller.CreateFeatureError:
    return jsonify({'error': 'Feature already exists, please try with another name'}), 400
  
@feature.route('/delete/<int:id>', methods=['DELETE'])
def delete_feature(id):
  try:
    feature_controller.delete_feature(id)

    return jsonify({"message": "Feature deleted"}), 200
    
  except feature_controller.NotFoundFeatureError:
    return jsonify({'error': "Feature doesn't exist"}), 400

@feature.route('/update/<int:id>', methods=['PUT'])
def update_feature(id):
  try:
    current_feature = feature_controller.get_feature_by_id(id)
    if not current_feature: raise feature_controller.NotFoundFeatureError

    existing_feature_values = feature_value_controller.get_all_feature_value_by_feature_id(current_feature.id)

    data = request.json
    feature_ = data['feature']
    feature_values_ = data['feature_value']

    incoming_feature_ids = {fv['id'] for fv in data['feature_value']}
    
    feature_data = CreateFeatureDTO(**feature_)
    if current_feature.name != feature_data.name:
      feature_controller.update_feature(current_feature, feature_data)

    feature_values_to_update = []
    if feature_values_:
      for fv in feature_values_:
        fv['feature_id'] = current_feature.id
        if not fv['create']: feature_values_to_update.append(UpdateFeatureValueDTO(**fv))
        else: feature_value_controller.create_feature_values(CreateFeatureValueDTO(**fv))
    
    feature_value_controller.update_feature_values(feature_values_to_update)
    
    for fv in existing_feature_values:
      if fv.id not in incoming_feature_ids:
        feature_value_controller.delete_feature_values(fv.id)

    return jsonify({"message": "Feature updated successfully"}), 201

  except feature_controller.CreateFeatureError:
    return jsonify({ 'error': 'This feature name is already in use, please try with another one'}), 400

  except feature_controller.NotFoundFeatureError:
    return jsonify({'error': f"Feature with ID {id} not found"}), 404

@feature.route('/create/all', methods=['POST'])
def create_feature_with_values():
  try:
    data = request.json
    feature_ = data['feature']
    feature_values_ = data['feature_value']

    feature_data = CreateFeatureDTO(**feature_)
    new_feature = feature_controller.create_feature(feature_data)

    
    for feature_value_ in feature_values_:
      feature_value_['feature_id'] = new_feature.id
      feature_value_data = CreateFeatureValueDTO(**feature_value_)
      feature_value_controller.create_feature_values(feature_value_data)

    return jsonify({"message": "Feature created successfully"}), 201
  
  except feature_value_controller.CreateFeaturevalueError:
    return jsonify({'error': 'Some of the feature values already exist, please try with another name'}), 400
  
  except feature_controller.CreateFeatureError:
    return jsonify({'error': 'Feature already exists, please try with another name'}), 400
  