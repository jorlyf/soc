from flask import Blueprint, request, jsonify
import json
from settings.baseDir import baseDirFlask
from routes.JwtAuth import JwtAuth
from routes.DbAuth import DbAuth

dbAuth = DbAuth()
jwtAuth = JwtAuth()

auth = Blueprint('auth', __name__)
questionList = json.load(
    open(baseDirFlask + '\settings\\regQuestions.json', encoding='utf-8'))

@auth.route('/api/auth/register', methods=['GET', 'POST'])
def registerUser():
    req = request.get_json(force=True)
    data = req.get('data')

    if dbAuth.registerUser(data):
        return {"status": 200}

    return {"status": 400}

@auth.route('/api/auth/login', methods=['GET', 'POST'])
def loginUser():
    req = request.get_json(force=True)
    data = req.get('data')
    if dbAuth.checkUserLoginAndPassword(data):
        user = dbAuth.getUserByLogin(data['login'])
        user.profile.updateLastOnline()
        return {
            "status": 200,
            "token": user.generateToken(),
            "userId": user.id
        }
    return {"status": 400}

@auth.route('/api/auth/getQuestions', methods=['GET'])
def getQuestions():
    return jsonify(questionList)

@auth.route('/api/auth/checkMyToken', methods=['GET', 'POST'])
def checkMyToken():
    req = request.get_json(force=True)
    token = req.get('token')
    return jwtAuth.decodeToken(token)
