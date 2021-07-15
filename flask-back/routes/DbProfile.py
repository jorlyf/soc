from DbBaseClass import DbBaseClass
from routes.DbAuth import DbAuth
from utils.uploads import generateHash, saveFile, deleteAvatar

dbAuth = DbAuth()

class DbProfile(DbBaseClass):
    def updateUserAvatar(self, avatar, userId):
        avatar.filename = generateHash()
        PATH_TO_PUBLIC_FOLDER = '\\react-front\\public\profileAvatars\\'
        saveFile(avatar, PATH_TO_PUBLIC_FOLDER)

        user = dbAuth.getUserById(userId)
        previousAvatar = user.profile.avatar_url
        deleteAvatar(previousAvatar)
        user.profile.updateAvatar(avatar.filename)
