def test_get_all(app, setup_feature):
  client = app.test_client()

  response = client.get('/feature/all')
  assert response.status_code == 200
  assert response.is_json

def test_get_by_id(app, setup_feature):
  client = app.test_client()
  response = client.get('/feature/1')
  assert response.status_code == 200
  assert response.is_json
  data = response.get_json()
  assert data['id'] == 1

def test_create(app):
  client = app.test_client()

  payload = {'name': 'Test'}
  response = client.post('/feature/create', json=payload)

  assert response.status_code == 201
  assert response.is_json

def test_delete(app, setup_feature):
  client = app.test_client()
  response = client.delete('/feature/delete/1')
  
  assert response.status_code == 200
  assert response.is_json

def test_create_all(app):
  client = app.test_client()
  payload = {
    'feature': {'name': 'test'},
    'feature_value': [{'name': 'Test feature value', 'stock': 1, 'price': 10}, {'name': 'Test feature value 2', 'stock': 12, 'price': 102}]
  }
  response = client.post('/feature/create/all', json=payload)

  assert response.status_code == 201
  assert response.is_json

def test_update(db, app, setup_feature_value):
  client = app.test_client()

  payload = {
    'feature': {'name': 'testFeature2'},
    'feature_value': [{'id': 3, 'name': 'test3', 'price': 1, 'stock': 1, 'create': False}, {'id': 3, 'name': 'test4', 'price': 1, 'stock': 1, 'create': False}]
  }
  response = client.put('/feature/update/2', json=payload)

  assert response.status_code == 201
  assert response.is_json
