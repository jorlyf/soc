from dataBase import db

class Users(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  login = db.Column(db.String(64), unique=True, nullable=False)
  passwordHash = db.Column(db.String(256), nullable=False)

