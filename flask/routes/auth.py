from flask import Blueprint, request

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['GET', 'POST'])
def registerUser():
    req = request.get_json(force=True)
    data = req.get('data')
    print(data, 'data')
    return {"msg": "hello"}


@auth.route('/login', methods=['GET', 'POST'])
def test():
    req = request.get_json(force=True)
    data = req.get('data')
    print(data, 'data')
    return {"msg": "hello"}


@auth.route('/getQuestion', methods=['GET'])
def getQuestion():
    return {'question': 'question', 'answer': 'даааааа'}