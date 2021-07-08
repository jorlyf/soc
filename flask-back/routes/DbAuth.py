from models import Profiles, Users
from werkzeug.security import check_password_hash, generate_password_hash
from DbBaseClass import DbBaseClass


class DbAuth(DbBaseClass):
    def registerUser(self, data):
        login = data['login']
        password = data['password']
        hash_password = generate_password_hash(password)
        newUser = Users(login=login, hash_password=hash_password)

        try:
            self.addData(newUser)
            self.flush()
            newProfile = Profiles(user_id=newUser.id)
            self.addData(newProfile)
            self.commitData()
            return True
        except:
            print('fail added new user')
            return False

    def checkUserLoginAndPassword(self, data):
        user = self.db.session.query(Users).filter_by(
            login=data['login']).first()
        if user:
            if check_password_hash(user.hash_password, data['password']):
                return True
            else:
                return False

        else:
            return False

    def getUserByLogin(self, filterValue):
        user = self.db.session.query(Users).filter_by(
            login=filterValue).first()
        if user:
            return user
        return False

    def getUserById(self, filterValue):
        user = self.db.session.query(Users).filter_by(
            id=filterValue).first()
        if user:
            return user
        return False
