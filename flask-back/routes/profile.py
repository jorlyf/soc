from flask import Blueprint, request

from routes.DbAuth import DbAuth

profile = Blueprint('profile', __name__)
dbAuth = DbAuth()

@profile.route('/getProfileById/<int:id>', methods=['GET'])
def getProfileById(id):
    user = dbAuth.getUserById(id)
    if user:
        return {"status": 200, "login": user.login, "avatarUrl": "s"}
    return {"status": 404}


@profile.route('/friend', methods=['GET'])
def friend():
    user1 = dbAuth.getUserByLogin('admin')
    user2 = dbAuth.getUserByLogin('jorlyf')
    user1.profile.beFriend(user2)

    return {'a': 'b'}


@profile.route('/getFriends/<int:id>')
def getFriends(id):
    user = dbAuth.getUserById(id)
    friends = user.profile.friends
    print(friends)
    #lis = {}
    for i in friends:
        print(i.id)
        #lis['a'] = i.login
    
    #print(lis)
    return {'ok': 1}