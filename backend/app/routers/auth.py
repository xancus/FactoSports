from flask import Blueprint, jsonify, request
from ..database import dbs

auth = Blueprint('auth', __name__)

@auth.route('/test', methods=['GET'])
def test ():
  

  data = {
    'name': 'Alice',
    'age': 30,
    'city': 'Cerdanyola del Vallès'
  }
  return jsonify(data)

@auth.route('/login', methods=['POST'])
def login():
  try:
    email = request.json.get('email')
    password = request.json.get('password')
    response = jsonify({
      'login': True
    })

    if not email: return jsonify({'error': 'User not found', 'status_code': 401}), 401
    return response, 200

  except Exception as e:
    return jsonify({'error': 'Internal server error', 'status_code': 500}), 500
