from app import App
from dbControl import dbControl

app=App().getApp()

dbControl().createAll(app)