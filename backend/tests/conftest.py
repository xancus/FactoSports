import pytest
from app.main import ini_app
from app.database import dbs, init_db, recreate_db
from app.config import TestingConfig
from app.database.models import FeatureValue, Feature, FeatureRestriction, Category, Product

@pytest.fixture
def app():
    app = ini_app(TestingConfig)
    yield app

@pytest.fixture
def db(app):
    with app.app_context():
        #init_db()
        recreate_db()
        yield dbs
        dbs.session.remove()
        dbs.drop_all()

@pytest.fixture
def setup_category(db):
    category_1 = Category(name='testCategory1')
    category_2 = Category(name='testCategory2')
    db.session.add(category_1)
    db.session.add(category_2)
    db.session.commit()
    return category_1, category_2

@pytest.fixture
def setup_feature(db):
    feature_1 = Feature(name='testFeature')
    feature_2 = Feature(name='testFeature2')
    db.session.add(feature_1)
    db.session.add(feature_2)
    db.session.commit()
    return feature_1, feature_2

@pytest.fixture
def setup_feature_value(db, setup_feature):
    feature_1, feature_2 = setup_feature
    feature_value_1 = FeatureValue(name="test", price=1, stock=1, feature_id=feature_1.id)
    feature_value_2 = FeatureValue(name="test2", price=1, stock=1, feature_id=feature_1.id)
    feature_value_3 = FeatureValue(name="test3", price=1, stock=1, feature_id=feature_2.id)
    db.session.add(feature_value_1)
    db.session.add(feature_value_2)
    db.session.add(feature_value_3)
    db.session.commit()
    return feature_value_1, feature_value_2, feature_value_3

@pytest.fixture
def setup_feature_restriction(db, setup_feature_value):
    feature_value_1, feature_value_2, _ = setup_feature_value
    feature_restriction = FeatureRestriction(
        restriction_feature_value_id=feature_value_1.id, 
        dependent_restriction_feature_value_id=feature_value_2.id
    )
    db.session.add(feature_restriction)
    db.session.commit()
    return feature_restriction

@pytest.fixture
def setup_product(db, setup_category, setup_feature):
    prod = Product(
        name= "Test product",
        img_src= "test_img_src",
        description= "",
        price= 20,
        on_sale= True,
        category_id= 1,
        features= []
    )
    db.session.add(prod)
    db.session.commit()
    return prod