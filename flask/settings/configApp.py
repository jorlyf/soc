from os import urandom

class Base:
  DEBUG = False
  SECRET_KEY = urandom(24).hex()


class Development(Base):
  DEBUG = True


class Production(Base):
  pass
