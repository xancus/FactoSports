def test_get_all(app, setup_product):
  client = app.test_client()

  response = client.get('/product/all')
  assert response.status_code == 200
  assert response.is_json

def test_get_by_id(app, setup_product):
  client = app.test_client()
  response = client.get('/product/1')
  assert response.status_code == 200
  assert response.is_json
  data = response.get_json()
  assert data['id'] == 1

def test_create(app, setup_feature):
  client = app.test_client()

  payload = {"name": "Test product2",
        "img_src": "test",
        "description": "",
        "price": 20,
        "on_sale": True,
        "category_id": 1,
        "features": [
            {
                "id": 1,
                "name": "testFeature"
            }
        ]}
  response = client.post('/product/create', json=payload)

  assert response.status_code == 201
  assert response.is_json

def test_update(app, setup_product):
  client = app.test_client()

  payload = {
    "name": "Super mountain bike",
    "description": "",
    "price": 155,
    "on_sale": False,
    "category_id": 1,
    "features": [
        {
            "id": 1,
            "name": "Color"
        },
        {
            "id": 2,
            "name": "Wheels"
        }
    ]
  }
  response = client.put('/product/update/1', json=payload)

  assert response.status_code == 201
  assert response.is_json

def test_delete(app, setup_product):
  client = app.test_client()
  response = client.delete('/product/delete/1')
  
  assert response.status_code == 200
  assert response.is_json

def test_get_by_categoryid(app, db, setup_product):
  client = app.test_client()
  response = client.get('/product/by-category/1')
  assert response.status_code == 200
  assert response.is_json
  data = response.get_json()
  assert data[0]['id'] == 1

def test_get_by_categoryid(app, db, setup_product, setup_feature_value):
  client = app.test_client()
  response = client.get('/product/features/1')
  assert response.status_code == 200
  assert response.is_json
  data = response.get_json()