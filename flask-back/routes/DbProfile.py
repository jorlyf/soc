from DbBaseClass import DbBaseClass
from routes.DbAuth import DbAuth
from utils.uploads import generateHash, saveFile, deleteAvatar

dbAuth = DbAuth()

class DbProfile(DbBaseClass):
    def updateProfileAvatar(self, avatar, userId):
        avatar.filename = generateHash()
        PATH_TO_PUBLIC_FOLDER = '\\react-front\\public\profileAvatars\\'
        saveFile(avatar, PATH_TO_PUBLIC_FOLDER)

        user = dbAuth.getUserById(userId)
        previousAvatar = user.profile.avatar_url
        deleteAvatar(previousAvatar)
        user.profile.updateAvatar(avatar.filename)
        user.profile.updateLastOnline()

    
    def updateProfileStatus(self, status, userId):
        user = dbAuth.getUserById(userId)
        user.profile.updateStatus(status)
        user.profile.updateLastOnline()

    def checkIsFriend(self, userId, friendId):
        user = dbAuth.getUserById(userId)
        friend = dbAuth.getUserById(friendId)
        friendList = user.profile.friends
        answ = 0

        print(friendList)
        if friend.profile in friendList:
            
            answ = 1
            print('работает')

        return answ