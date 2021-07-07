from app import App
from DbBaseClass import DbBaseClass

app=App().getApp()

DbBaseClass().createAll(app)