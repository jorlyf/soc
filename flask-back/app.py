from flask import Flask
from dataBase import db
from flask_cors import CORS

#blueprints
from routes.auth import auth
from routes.profile import profile
from routes.posts import posts


class App:

  def __init__(self, config='Development'):
    self.config = config
    self.__createApp()
    self.__registerBlueprints()


  def __registerBlueprints(self):
    self.app.register_blueprint(auth)
    self.app.register_blueprint(profile)
    self.app.register_blueprint(posts)


  def __createApp(self):
    self.app = Flask(__name__)
    CORS(self.app)
    self.app.config.from_object(f'settings.configApp.{self.config}')
    db.init_app(self.app)

  def getApp(self):
    return self.app


