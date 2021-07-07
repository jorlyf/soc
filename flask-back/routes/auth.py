from flask import Blueprint, request, jsonify
from random import choice
import json
from settings.baseDir import baseDir
from dataBase import db
from models import Users
from routes.JwtAuth import JwtAuth
from routes.DbAuth import DbAuth

dbAuth = DbAuth()
jwtAuth = JwtAuth()

auth = Blueprint('auth', __name__)
questionList = json.load(open(baseDir + '\settings\\regQuestions.json', encoding='utf-8')) #переделать

@auth.route('/auth/register', methods=['GET', 'POST'])
def registerUser():
    req = request.get_json(force=True)
    data = req.get('data')
    
    if dbAuth.registerUser(data):
        return {"status": 200}
    
    return {"status": 400}


@auth.route('/auth/login', methods=['GET', 'POST'])
def loginUser():
    req = request.get_json(force=True)
    data = req.get('data')
    if dbAuth.checkUserLoginAndPassword(data):
        user = db.session.query(Users).filter_by(login=data['login']).first()
        return {"status": 200, "token": user.generateToken(), "userId": user.id}
    return {"status": 400}


@auth.route('/auth/getQuestions', methods=['GET'])
def getQuestions():
    return jsonify(questionList)


@auth.route('/auth/checkMyToken', methods=['GET', 'POST'])
def checkMyToken():
    req = request.get_json(force=True)
    token = req.get('data')
    return jwtAuth.decodeToken(token)

