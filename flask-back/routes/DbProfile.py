from DbBaseClass import DbBaseClass
from routes.DbAuth import DbAuth
from utils.uploads import generateHash, saveImage, deleteAvatar

dbAuth = DbAuth()

class DbProfile(DbBaseClass):
    def updateProfileAvatar(self, avatar, userId):
        avatar.filename = f'{generateHash()}.jpg'
        PATH_TO_PUBLIC_FOLDER = '\\react-front\\public\profileAvatars\\'
        saveImage(avatar, PATH_TO_PUBLIC_FOLDER)

        user = dbAuth.getUserById(userId)
        previousAvatar = user.profile.avatar_url
        deleteAvatar(previousAvatar)
        user.profile.updateAvatar(avatar.filename)
        user.profile.updateLastOnline()

    
    def updateProfileStatus(self, status, userId):
        user = dbAuth.getUserById(userId)
        user.profile.updateStatus(status)
        user.profile.updateLastOnline()
