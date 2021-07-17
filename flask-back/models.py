from datetime import timedelta

from dataBase import db
from routes.JwtAuth import JwtAuth
from utils.times import getTime

jwtAuth = JwtAuth()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(64), unique=True, nullable=False)
    hash_password = db.Column(db.String(256), nullable=False)
    profile = db.relationship(  #it have all social info
        'Profiles',
        backref='user',
        lazy=True,
        uselist=False)

    def generateToken(self):
        dt = getTime() + timedelta(days=14)
        token = jwtAuth.encodeToken({'id': self.id, 'exp': dt})
        return token


class Profiles(db.Model):
    __tablename__ = 'profiles'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    avatar_url = db.Column(db.String(128))
    status = db.Column(db.String(256))
    friends = db.relationship('Friendships',
                              backref='profile',
                              lazy=True,
                              uselist=True)
    register_date = db.Column(db.DateTime, default=getTime())
    last_online = db.Column(db.DateTime, default=getTime())

    def addFriend(self, friend):
        friendship = Friendships(a_id=self.id, b_id=friend.id)
        try:
            db.session.add(friendship)
            db.session.commit()
        except:
            pass

    def updateLastOnline(self):
        self.last_online = getTime()
        db.session.commit()

    def serializeForFriendList(self):
        return {
            "selfId": self.id,
            "login": self.user.login,
            "avatarUrl": self.avatar_url,
            "lastOnline": self.last_online
        }

    def updateAvatar(self, avatarUrl):
        self.avatar_url = avatarUrl
        db.session.commit()

    def updateStatus(self, status):
        self.status = status
        db.session.commit()



class Friendships(db.Model):
    __tablename__ = 'friendships'
    id = db.Column(db.Integer, primary_key=True)
    a_id = db.Column(db.Integer, db.ForeignKey('profiles.id'), nullable=False)
    b_id = db.Column(db.Integer, nullable=False)
