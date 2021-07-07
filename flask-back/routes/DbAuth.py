from models import Users
from werkzeug.security import check_password_hash, generate_password_hash
from DbBaseClass import DbBaseClass


class DbAuth(DbBaseClass):
    def registerUser(self, data):
        login = data['login']
        password = data['password']
        hashPassword = generate_password_hash(password)
        newUser = Users(login=login, hashPassword=hashPassword)
        try:
            self.addData(newUser)
            self.commitData()
            return True
        except:
            print('fail added new user')
            return False

    def checkUserLoginAndPassword(self, data):
        user = self.db.session.query(Users).filter_by(
            login=data['login']).first()
        if user:
            if check_password_hash(user.hashPassword, data['password']):
                return True
            else:
                return False

        else:
            return False
