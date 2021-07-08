from datetime import timedelta

from sqlalchemy.orm import backref


from dataBase import db
from DbBaseClass import DbBaseClass
from routes.JwtAuth import JwtAuth
from utils.times import getTime

JwtAuth = JwtAuth()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(64), unique=True, nullable=False)
    hash_password = db.Column(db.String(256), nullable=False)
    profile = db.relationship(
        'Profiles', backref='user', lazy=True, uselist=False)

    def generateToken(self):
        dt = getTime() + timedelta(minutes=30)
        token = JwtAuth.encodeToken({'id': self.id, 'exp': dt})
        return token


class Profiles(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'))
    avatar_url = db.Column(db.String(128))
    status = db.Column(db.String(256))
    friends = db.relationship(
        'Friendships', lazy='dynamic', uselist=True)

    def addFriend(self, friend):
        friendship = Friendships(a_id=self.id, b_id=friend.id)
        try:
            db.session.add(friendship)
            db.session.commit()
        except:
            pass


class Friendships(db.Model):
    __tablename__ = 'friendships'
    a_id = db.Column(db.Integer, db.ForeignKey(
        'profiles.id'), primary_key=True)
    b_id = db.Column(db.Integer, primary_key=True)

