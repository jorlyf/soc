from os import urandom

class Base:
  DEBUG = False
  SECRET_KEY = urandom(24).hex()
  SQLALCHEMY_DATABASE_URI = 'sqlite:///dbSqlite.db'
  SQLALCHEMY_TRACK_MODIFICATIONS = False


class Development(Base):
  DEBUG = True


class Production(Base):
  pass
