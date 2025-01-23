def test_all(app, setup_category):
  client = app.test_client()

  response = client.get('/category/all')
  assert response.status_code == 200
  assert response.is_json
  
  data = response.get_json()
  assert data[0]['id'] == 1

def test_create(app, db):
  client = app.test_client()

  payload = {'name': 'test'}
  response = client.post('/category/create', json=payload)

  assert response.status_code == 201
  assert response.is_json

def test_delete(app, db, setup_category):
  client = app.test_client()
  response = client.delete('/category/delete/1')
  
  assert response.status_code == 200
  assert response.is_json

def test_by_id(app, setup_category):
  client = app.test_client()

  response = client.get('/category/1')
  assert response.status_code == 200
  assert response.is_json
  
  data = response.get_json()
  assert data['id'] == 1
