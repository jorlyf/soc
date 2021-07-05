import jwt
from utils.times import getTime

class jwtControl:
    def __init__(self):
        self.__algorithm = "HS256"
        self.__secretPhrase = "b316f8daeee31360d15e7205c3b13f814bb1c23f553ab7a309ba1372f120791d49b1401c"

    def encodeToken(self, payload):
        token = jwt.encode( payload, self.__secretPhrase, algorithm=self.__algorithm )
        return token

    def decodeToken(self, token):
        try:
            decodeToken = jwt.decode( token, self.__secretPhrase, algorithms=self.__algorithm )
            print(decodeToken)
            if decodeToken['ext'] > getTime():
                return False
            return decodeToken
        except:
            print('ошибка')
            return False

