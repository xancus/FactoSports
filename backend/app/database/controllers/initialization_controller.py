from .. import dbs
from ..models import InitializationLog

def is_db_initialize():
  return InitializationLog.query.filter_by(initialized=True).first() is not None

def set_db_initialized():
  log = InitializationLog(initialized=True)
  dbs.session.add(log)
  dbs.session.commit()