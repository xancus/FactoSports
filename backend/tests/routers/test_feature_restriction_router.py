def test_all(app, setup_feature_restriction):
  client = app.test_client()
  response = client.get('/feature_restriction/all')
  assert response.status_code == 200
  assert response.is_json
  data = response.get_json()
  print(data)
  assert data[0]['id'] == 1


def test_create(app, setup_feature_value):
  client = app.test_client()

  payload = {'restriction_feature_value_id': 3, 'dependent_restriction_feature_value_id': 1}
  response = client.post('/feature_restriction/create', json=payload)

  assert response.status_code == 201
  assert response.is_json

def test_delete(app, setup_feature_restriction):
  client = app.test_client()
  response = client.delete('/feature_restriction/delete/1')
  
  assert response.status_code == 200
  assert response.is_json

def test_by_id(app, setup_feature_restriction):
  client = app.test_client()

  response = client.get('/feature_restriction/1')
  assert response.status_code == 200
  assert response.is_json
  
  data = response.get_json()
  assert data['id'] == 1