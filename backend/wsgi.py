from app.main import ini_app
from app.config import DevConfig, Config, TestingConfig
import os

config_class = os.environ.get('FLASK_ENV', 'development')
print(config_class)

config_mapping = {
  'production': Config,
  'development': DevConfig,
  'testing': TestingConfig,
}

app = ini_app(config_mapping.get(config_class))

if __name__ == '__main__':
  app.run(host='0.0.0.0')