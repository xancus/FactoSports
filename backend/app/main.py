from flask import Flask
from .database import dbs, init_db

def ini_app(config):
  app = Flask(__name__)
  app.config.from_object(config)
  dbs.init_app(app)

  with app.app_context():
    from .routers.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    from .routers.category import category as category_blueprint
    app.register_blueprint(category_blueprint, url_prefix='/category')

    from .routers.feature import feature as feature_blueprint
    app.register_blueprint(feature_blueprint, url_prefix='/feature')

    from .routers.feature_value import feature_value as feature_value_blueprint
    app.register_blueprint(feature_value_blueprint, url_prefix='/feature_value')

    from .routers.feature_restriction import feature_restriction as feature_restriction_blueprint
    app.register_blueprint(feature_restriction_blueprint, url_prefix='/feature_restriction')

    from .routers.product import product as product_blueprint
    app.register_blueprint(product_blueprint, url_prefix='/product')


    init_db()

    return app