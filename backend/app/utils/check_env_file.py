from dotenv import load_dotenv

def check_env(config_class):
  if config_class == 'development':
    load_dotenv('.env.dev') 
  elif config_class == 'production':
    load_dotenv('.env')
  return