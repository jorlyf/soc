from datetime import timedelta

from sqlalchemy.sql.elements import and_, or_

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

    def __repr__(self):
        return f'<User/ {self.login}>'


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

    def __repr__(self):
        return f'<Profile/ {self.user.login}>'

    def addFriendship(self, friend):
        try:
            check = getFriendStatus(self.id, friend.id)

            if not check['status']:  # create new friendship
                friendship = Friendships(a_id=self.id,
                                        b_id=friend.id,
                                        is_accepted=False)
                db.session.add(friendship)

            else:  # friendship exist
                if check['is_accepted']:
                    return 400  # status

                else:  # modify friendship
                    if self.id != check['requester_id']:
                        friendship = check['friendship']
                        friendship.is_accepted = True

                    else:
                        return 400  # status
            db.session.commit()
            return 200
        except:
            pass

    def deleteFriendship(self, friend):
        try:
            Friendships.query.filter(
                or_(
                    and_(Friendships.a_id == self.id,
                         Friendships.b_id == friend.id),
                    and_(Friendships.a_id == friend.id,
                         Friendships.b_id == self.id))).delete()
            db.session.commit()
            return 200
        except:
            pass

    def updateLastOnline(self):
        self.last_online = getTime()
        db.session.commit()

    def serializeForFriendList(self):
        return {
            "id": self.id,
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
    is_accepted = db.Column(db.Boolean)

    def __repr__(self):
        return f'<Friendship| login: {self.profile.user.login}; id1: {self.a_id}; id2: {self.b_id}|>'


def getFriendStatus(a_id, b_id):
    friendship = Friendships.query.filter(
        or_(and_(Friendships.a_id == a_id, Friendships.b_id == b_id),
            and_(Friendships.a_id == b_id, Friendships.b_id == a_id))).first()
    if friendship:
        return {
            "status": True,
            "friendship": friendship,
            "is_accepted": friendship.is_accepted,
            "requester_id": friendship.a_id
        }
    else:
        return {"status": False}
