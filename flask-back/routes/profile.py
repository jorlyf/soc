from flask import Blueprint, request

from routes.DbAuth import DbAuth
from routes.JwtAuth import JwtAuth
from routes.authRequired import AuthOptional, AuthRequired
from routes.DbProfile import DbProfile
from routes.friendsSystem import FriendSystem

from models import getFriendStatus

from utils.times import formatTime
from utils.isMyId import checkIsMyId

profile = Blueprint('profile', __name__)
dbAuth = DbAuth()
jwtAuth = JwtAuth()
dbProfile = DbProfile()


@profile.route('/api/profile/getProfile/<int:profileID>', methods=['GET', 'POST'])
@AuthOptional()
def getProfile(requesterID, profileID):
    user = dbAuth.getUserById(profileID)

    if user:
        friends = FriendSystem(user).getSerializedAcceptedFriends()
        isAccepted = False
        if not requesterID:
            requesterID = 0

        if not checkIsMyId(requesterID, profileID):
            fs = getFriendStatus(requesterID, profileID)

            if fs['status']:
                requesterID = fs['requester_id']
                isAccepted = fs['is_accepted']
        info = {
            "id": user.id,
            "login": user.login,
            "avatarUrl": user.profile.avatar_url,
            "status": user.profile.status,
            "friends": friends,
            "registerDate": formatTime(user.profile.register_date),
            "lastOnline": user.profile.last_online,
            "ourFriendship": {
                "requesterId": requesterID,
                "isAccepted": isAccepted
            }
        }
        return {"status": 200, "info": info}
    return {"status": 404, "info": "user not found"}


@profile.route('/api/profile/addFriend/<int:friendID>',
               methods=['GET', 'POST'])
@AuthRequired()
def addFriend(requesterID, friendID):  #updateOnline +
    user = dbAuth.getUserById(requesterID)
    friend = dbAuth.getUserById(friendID)

    user.profile.updateLastOnline()

    status = user.profile.addFriendship(friend)
    return {'status': status}


@profile.route('/api/profile/deleteFriend/<int:friendID>',
               methods=['GET', 'POST'])
@AuthRequired()
def deleteFriend(requesterID, friendID):  #updateOnline +
    user = dbAuth.getUserById(requesterID)
    friend = dbAuth.getUserById(friendID)

    user.profile.updateLastOnline()

    status = user.profile.deleteFriendship(friend)
    return {'status': status}


@profile.route('/api/profile/getFriends/<int:profileID>', methods=['GET', 'POST'])
@AuthOptional()
def getFriends(requesterID, profileID):
    user = dbAuth.getUserById(profileID)
    if user:
        if requesterID: # = authorized user
            #  return other
            pass

        acceptedFriends = FriendSystem(user).getSerializedAcceptedFriends()
        return {"status": 200, "acceptedFriends": acceptedFriends}

    return {"status": 404}


@profile.route('/api/profile/uploadAvatar', methods=['GET', 'POST'])
@AuthRequired(options={"type": "FormData"})
def uploadAvatar(requesterID):  #update online +
    user = dbAuth.getUserById(requesterID)
    if user:
        files = request.files.getlist('files')
        avatar = files[0]
        dbProfile.updateProfileAvatar(avatar, user)
        return {"status": 200, 'avatarUrl': avatar.filename}
    return {"status": 400}


@profile.route('/api/profile/uploadProfileStatus', methods=['GET', 'POST'])
@AuthRequired()
def uploadProfileStatus(requesterID):  #update online +
    user = dbAuth.getUserById(requesterID)
    if user:
        req = request.get_json(force=True)
        status = req.get('data')

        dbProfile.updateProfileStatus(status, user)
        return {"status": 200}
    return {"status": 400}