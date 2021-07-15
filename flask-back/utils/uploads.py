import os
from os import urandom
from settings.baseDir import baseDirProject

def generateHash():
    return urandom(48).hex()

def saveFile(file, path):
    file.save(os.path.join(f'{baseDirProject}{path}{file.filename}'))

def deleteAvatar(previousAvatar):
    PATH_TO_AVATARS_FOLDER = '\\react-front\\public\\profileAvatars\\'
    if os.path.isfile(os.path.join(f'{baseDirProject}{PATH_TO_AVATARS_FOLDER}{previousAvatar}')):
        os.remove(os.path.join(f'{baseDirProject}{PATH_TO_AVATARS_FOLDER}{previousAvatar}'))
