from dataBase import db
from werkzeug.security import generate_password_hash, check_password_hash
from models import Users

class dbControl:
    def __init__(self):
        self.db = db


    def createAll(self, app):
        self.db.create_all(app=app)


    def addData(self, data):
        self.db.session.add(data)


    def commitData(self):
        self.db.session.commit()


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
        user = self.db.session.query(Users).filter_by(login=data['login']).first()
        if user:
            if check_password_hash(user.hashPassword, data['password']):
                return True
            else:
                return False

        else: return False
