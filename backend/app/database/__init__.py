from flask_sqlalchemy import SQLAlchemy
dbs = SQLAlchemy()

def init_db():
    try:
        dbs.create_all()
        from .controllers import initialization_controller
        from ..utils.initialize_db import initialize_data
        
        if not initialization_controller.is_db_initialize():
            initialize_data()
            initialization_controller.set_db_initialized()
            return
        print("DB initialized")
    except Exception as e:
        print(f"Error creating DB: {e}")

def recreate_db():
    dbs.drop_all()
    dbs.create_all()