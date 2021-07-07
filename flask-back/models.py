from dataBase import db
from datetime import timedelta
from routes.JwtAuth import JwtAuth
from utils.times import getTime

JwtAuth = JwtAuth()

class Users(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  login = db.Column(db.String(64), unique=True, nullable=False)
  hashPassword = db.Column(db.String(256), nullable=False)

  def generateToken(self):
    dt = getTime() + timedelta(days=7)
    token = JwtAuth.encodeToken({'login': self.login, 'exp': dt})
    return token
