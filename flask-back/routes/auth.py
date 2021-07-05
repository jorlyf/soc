from json import encoder
from flask import Blueprint, request
import json
from settings.baseDir import baseDir
from random import choice

auth = Blueprint('auth', __name__)
questionList = json.load(open(baseDir + '\settings\\regQuestions.json', encoding='utf-8'))

@auth.route('/register', methods=['GET', 'POST'])
def registerUser():
    req = request.get_json(force=True)
    data = req.get('data')
    print(data)
    return {"msg": "hello"}


@auth.route('/login', methods=['GET', 'POST'])
def loginUser():
    req = request.get_json(force=True)
    data = req.get('data')
    print(data)
    return {"msg": "hello"}


@auth.route('/getQuestion', methods=['GET'])
def getQuestion():
    obj = choice(questionList)
    return {'question': obj['question'], 'answer': obj['answer']}