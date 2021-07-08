import re
from flask import Blueprint, request

from routes.DbAuth import DbAuth
from routes.JwtAuth import JwtAuth
from routes.jwtRequired import tokenRequired

profile = Blueprint('profile', __name__)
dbAuth = DbAuth()
jwtAuth = JwtAuth()

@profile.route('/getProfileById/<int:id>', methods=['GET'])
def getProfileById(id):
    user = dbAuth.getUserById(id)
    if user:
        return {"status": 200, "login": user.login, "avatarUrl": "s"}
    return {"status": 404}


@profile.route('/friend', methods=['GET', 'POST'])
def friend():
    req = request.get_json(force=True)
    friendId = req.get('id')
    token = req.get('token')

    check = tokenRequired(token)
    if check == {'status': True}:
        userId = check['id']
        user = dbAuth.getUserById(userId)
        friend = dbAuth.getUserById(friendId)
        user.profile.addFriend(friend)
        return {'status': 200}
    else:
        return {'status': 404}


@profile.route('/getFriends/<int:id>')
def getFriends(id):
    user = dbAuth.getUserById(id)
    friends = user.profile.friends
    profsList = []
    for i in friends:
        print(i.id)
        prf = {}
        prf['login'] = i.user.login
        profsList.append(prf)
    
    print(profsList)
    return {"profiles": profsList}