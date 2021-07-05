from flask import Blueprint, request
from random import choice
import json
from settings.baseDir import baseDir
from dbControl import dbControl
from dataBase import db
from models import Users
from routes.jwtControl import jwtControl

dbController = dbControl()
jwtController = jwtControl()

auth = Blueprint('auth', __name__)
questionList = json.load(open(baseDir + '\settings\\regQuestions.json', encoding='utf-8'))

@auth.route('/auth/register', methods=['GET', 'POST'])
def registerUser():
    req = request.get_json(force=True)
    data = req.get('data')
    
    if dbController.registerUser(data):
        return {"status": "ok"}
    
    return {"status": "not ok"}


@auth.route('/auth/login', methods=['GET', 'POST'])
def loginUser():
    req = request.get_json(force=True)
    data = req.get('data')
    if dbController.checkUserLoginAndPassword(data):
        user = db.session.query(Users).filter_by(login=data['login']).first()
        return {"status": "ok", "token": user.generateToken()}
    return {"status": "not ok"}


@auth.route('/auth/getQuestion', methods=['GET'])
def getQuestion():
    obj = choice(questionList)
    return {'question': obj['question'], 'answer': obj['answer']}


@auth.route('/auth/checkMyToken', methods=['GET', 'POST'])
def checkMyToken():
    req = request.get_json(force=True)
    token = req.get('data')
    if jwtController.decodeToken(token):
        return {"status": "ok"}

