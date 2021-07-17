from flask import Blueprint, request

from routes.DbAuth import DbAuth
from routes.JwtAuth import JwtAuth
from routes.jwtRequired import tokenRequired
from routes.DbProfile import DbProfile

from routes.Friends import Friends
from utils.times import formatTime

profile = Blueprint('profile', __name__)
dbAuth = DbAuth()
jwtAuth = JwtAuth()
dbProfile = DbProfile()


@profile.route('/getProfileById/<int:id>', methods=['GET'])
def getProfileById(id):
    user = dbAuth.getUserById(id)
    if user:
        friendsArray = Friends(user.profile.friends).getFriendProfiles()
        friendsSerialized = []
        for profile in friendsArray:
            serialized = profile.serializeForFriendList()
            friendsSerialized.append(serialized)
        Friends(user.profile.friends).checkMutually()
        info = {
            "id": user.id,
            "login": user.login,
            "avatarUrl": user.profile.avatar_url,
            "status": user.profile.status,
            "friends": friendsSerialized,
            "registerDate": formatTime(user.profile.register_date),
            "lastOnline": user.profile.last_online,
        }
        return {"status": 200, "info": info}
    return {"status": 404}


@profile.route('/beFriends/<int:friendId>', methods=['GET', 'POST'])
def beFriends(friendId): #updateOnline +
    req = request.get_json(force=True)
    token = req.get('token')

    encoded = tokenRequired(token)
    if encoded['status'] == True:
        userId = encoded['id']
        user = dbAuth.getUserById(userId)
        user.profile.updateLastOnline()

        friend = dbAuth.getUserById(friendId)
        user.profile.addFriend(friend)
        return {'status': 200}
    else:
        return {'status': 401}


@profile.route('/getFriends/<int:id>')
def getFriends(id):
    user = dbAuth.getUserById(id)
    friends = user.profile.friends
    profsList = []
    for i in friends:
        prf = {}
        prf['login'] = i.user.login
        profsList.append(prf)

    print(profsList)
    return {"profiles": profsList}


@profile.route('/uploadAvatar', methods=['GET', 'POST'])
def uploadAvatar(): #update online +
    token = request.form.get('token')
    
    encoded = tokenRequired(token)
    if encoded['status'] == True:
        avatar = request.files.get('file')
        dbProfile.updateProfileAvatar(avatar, encoded['id'])
        return {"status": 200, 'avatarUrl': avatar.filename}
    return {"status": 401}


@profile.route('/uploadProfileStatus', methods=['GET', 'POST'])
def uploadProfileStatus(): #update online +
    req = request.get_json(force=True)
    token = req.get('token')
    status = req.get('data')

    encoded = tokenRequired(token)
    if encoded['status'] == True:
        dbProfile.updateProfileStatus(status, encoded['id'])
        return {"status": 200}
    return {"status": 401}


@profile.route('/checkFriendStatus/<int:friendId>', methods=['GET', 'POST'])
def checkFriendStatus(friendId): #update online -
    req = request.get_json(force=True)
    token = req.get('token')
    encoded = tokenRequired(token)
    if encoded['status'] == True:
        return {"status": 200, "isFriend": dbProfile.checkIsFriend(encoded['id'], friendId)}
    return {"status": 401}

