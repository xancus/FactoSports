import os
from dotenv import load_dotenv
from .utils.check_env_file import check_env

config_class = os.environ.get('FLASK_ENV', 'development')
check_env(config_class)

class Config(object):
  FLASK_ENV = 'production'
  DEBUG=False
  SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{os.environ.get("POSTGRES_USER")}:{os.environ.get("POSTGRES_PASSWORD")}@{os.environ.get("POSTGRES_HOST")}:{os.environ.get("POSTGRES_PORT")}/{os.environ.get("POSTGRES_DB")}'
  SQLALCHEMY_TRACK_MODIFICATIONS = False
    
class DevConfig(Config):
  FLASK_ENV = 'development'
  SQLALCHEMY_DATABASE_URI = f'postgresql+psycopg2://{os.environ.get("POSTGRES_USER")}:{os.environ.get("POSTGRES_PASSWORD")}@localhost:{os.environ.get("POSTGRES_PORT")}/{os.environ.get("POSTGRES_DB")}'
  WTF_CSRF_ENABLED = False
  DEBUG=True

class TestingConfig(Config):
  SQLALCHEMY_DATABASE_URI = 'sqlite:///testdb.sqlite'
  WTF_CSRF_ENABLED = False
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  TESTING = True