from datetime import timedelta


from dataBase import db
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
        token = JwtAuth.encodeToken({'login': self.login, 'exp': dt})
        return token



friendship = db.Table(
    'friendships', 
    db.Column('id', primary_key=True),
    db.Column('a_id', db.ForeignKey('users.id')),
    db.Column('b_id', db.ForeignKey('users.id'))
)

class Profiles(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    avatar_url = db.Column(db.String(128))
    status = db.Column(db.String(256))
    friends = db.relationship('Users',
        secondary=friendship,
        primaryjoin=id==friendship.c.a_id,
        secondaryjoin=id==friendship.c.b_id
    )

    def beFriend(self, friend):
        if not friend in self.friends:
            self.friends.append(friend)
        print(self.friends)


    def removeFriend(self, friend):
        if friend in self.friends:
            self.friends.remove(friend)