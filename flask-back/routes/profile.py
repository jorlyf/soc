from flask import Blueprint, request

from routes.DbAuth import DbAuth
from routes.JwtAuth import JwtAuth
from routes.jwtRequired import tokenRequired
from routes.DbProfile import DbProfile
from routes.friendsSystem import FriendSystem

from models import getFriendStatus

from utils.times import formatTime
from utils.isMyId import checkIsMyId

profile = Blueprint('profile', __name__)
dbAuth = DbAuth()
jwtAuth = JwtAuth()
dbProfile = DbProfile()


@profile.route('/api/profile/getProfile/<int:id>', methods=['GET', 'POST'])
def getProfileById(id):
    user = dbAuth.getUserById(id)
    req = request.get_json(force=True)
    token = req.get('token')

    if user:
        friends = FriendSystem(user).getSerializedAcceptedFriends()
        requesterId = 0
        isAccepted = False
        
        if token:
            encoded = tokenRequired(token)
            if encoded['status'] == True:
                if not checkIsMyId(encoded['id'], id):
                    fs = getFriendStatus(encoded['id'], id)

                    if fs['status']:
                        requesterId = fs['requester_id']
                        isAccepted = fs['is_accepted']
            else:
                return {"status": 401}
        info = {
            "id": user.id,
            "login": user.login,
            "avatarUrl": user.profile.avatar_url,
            "status": user.profile.status,
            "friends": friends,
            "registerDate": formatTime(user.profile.register_date),
            "lastOnline": user.profile.last_online,
            "ourFriendship" : {"requesterId": requesterId, "isAccepted": isAccepted}
        }
        return {"status": 200, "info": info}
    return {"status": 404, "info": "user not found"}

@profile.route('/api/profile/addFriend/<int:friendId>', methods=['GET', 'POST'])
def addFriend(friendId): #updateOnline +
    req = request.get_json(force=True)
    token = req.get('token')
    if token:
        encoded = tokenRequired(token)
        if encoded['status']:
            userId = encoded['id']
            user = dbAuth.getUserById(userId)
            friend = dbAuth.getUserById(friendId)

            user.profile.updateLastOnline()

            status = user.profile.addFriendship(friend)
            return {'status': status}
        else:
            return {'status': 401}
    else:
        return {'status': 400}

@profile.route('/api/profile/deleteFriend/<int:friendId>', methods=['GET', 'POST'])
def deleteFriend(friendId): #updateOnline +
    req = request.get_json(force=True)
    token = req.get('token')
    if token:
        encoded = tokenRequired(token)
        if encoded['status']:
            userId = encoded['id']
            user = dbAuth.getUserById(userId)
            friend = dbAuth.getUserById(friendId)

            user.profile.updateLastOnline()

            status = user.profile.deleteFriendship(friend)
            return {'status': status}
        else:
            return {'status': 401}
    else:
        return {'status': 400}

@profile.route('/api/profile/getFriends/<int:id>', methods=['GET', 'POST'])
def getFriends(id):
    req = request.get_json(force=True)
    token = req.get('token')
    user = dbAuth.getUserById(id)
    if user:
        if token:
            #  return other
            pass
        
        acceptedFriends = FriendSystem(user).getSerializedAcceptedFriends()
        return {"status": 200, "acceptedFriends": acceptedFriends}

    return {"status": 404}

@profile.route('/api/profile/uploadAvatar', methods=['GET', 'POST'])
def uploadAvatar(): #update online +
    token = request.form.get('token')
    
    encoded = tokenRequired(token)
    if encoded['status'] == True:
        avatar = request.files.get('file')
        dbProfile.updateProfileAvatar(avatar, encoded['id'])
        return {"status": 200, 'avatarUrl': avatar.filename}
    return {"status": 401}

@profile.route('/api/profile/uploadProfileStatus', methods=['GET', 'POST'])
def uploadProfileStatus(): #update online +
    req = request.get_json(force=True)
    token = req.get('token')
    status = req.get('data')

    encoded = tokenRequired(token)
    if encoded['status'] == True:
        dbProfile.updateProfileStatus(status, encoded['id'])
        return {"status": 200}
    return {"status": 401}

@profile.route('/api/profile/checkFriendStatus/<int:friendId>', methods=['GET', 'POST'])
def checkFriendStatus(friendId): #update online -
    req = request.get_json(force=True)
    token = req.get('token')
    encoded = tokenRequired(token)
    if encoded['status'] == True:
        return {"status": 200, "isFriend": dbProfile.checkIsFriend(encoded['id'], friendId)}
    return {"status": 401}

