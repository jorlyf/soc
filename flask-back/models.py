from dataBase import db
from datetime import timedelta
from routes.jwtControl import jwtControl
from utils.times import getTime

jwtController = jwtControl()

class Users(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  login = db.Column(db.String(64), unique=True, nullable=False)
  hashPassword = db.Column(db.String(256), nullable=False)

  def generateToken(self):
    dt = getTime() + timedelta(days=1)
    print(dt)
    token = jwtController.encodeToken({'login': self.login, 'exp': dt})
    return token
