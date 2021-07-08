from dataBase import db


class DbBaseClass:
    def __init__(self):
        self.db = db

    def createAll(self, app):
        self.db.create_all(app=app)

    def addData(self, data):
        self.db.session.add(data)

    def flush(self):
        self.db.session.flush()

    def commitData(self):
        self.db.session.commit()
