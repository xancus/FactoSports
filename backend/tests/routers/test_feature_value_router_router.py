def test_get_all_restricted(app, setup_feature_restriction):
  client = app.test_client()
  payload = {
    "prevIds": []
}
  response = client.post('/feature_value/all/restricted/2', json=payload)
  assert response.status_code == 200
  assert response.is_json

def test_get_all(app, setup_feature_value):
  client = app.test_client()

  response = client.get('/feature_value/all')
  assert response.status_code == 200
  assert response.is_json

def test_get_by_id(app, setup_feature_value):
  client = app.test_client()
  response = client.get('/feature_value/1')
  assert response.status_code == 200
  assert response.is_json
  data = response.get_json()
  assert data['id'] == 1

def test_create(app, db):
  client = app.test_client()

  payload = {'name': 'test', 'price': 1, 'stock': 10, 'feature_id': 1}
  response = client.post('/feature_value/create', json=payload)

  assert response.status_code == 201
  assert response.is_json

def test_delete(app, setup_feature_value):
  client = app.test_client()
  response = client.delete('/feature_value/delete/1')
  
  assert response.status_code == 200
  assert response.is_json

def test_get_all_by_feature(app, setup_feature_value):
  client = app.test_client()
  response = client.get('/feature_value/all/1')
  data = response.get_json()
  assert response.status_code == 200
  assert response.is_json
  
  assert isinstance(data, list)
