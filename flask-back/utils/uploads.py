import os
from os import urandom
from settings.baseDir import baseDirProject

from time import time

def generateHash():
    return urandom(32).hex()

def saveImage(image, path):
    filename = image.filename
    image.save(os.path.join(f'{baseDirProject}{path}{filename}'))

def deleteAvatar(previousAvatar):
    if previousAvatar != 'default.jpg': # чтоб дефолтный не удалял а то офигел
        PATH_TO_AVATARS_FOLDER = '\\react-front\\public\\profileAvatars\\'
        PATH = os.path.join(f'{baseDirProject}{PATH_TO_AVATARS_FOLDER}{previousAvatar}')
        if os.path.isfile(PATH):
            os.remove(PATH)
