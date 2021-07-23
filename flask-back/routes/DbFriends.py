from dataBase import db

class DbFriends:
    def __init__(self, friendshipList):  #need a friendList model object
        self.friendshipList = friendshipList

        self.__friends = []
        for friendship in friendshipList:
            self.__friends.append(friendship.profile)

    def getFriendProfiles(self):
        return self.__friends

    def getMutuallyFriendProfiles(self):
        pass

    def checkMutually(self):
        pass

    def getAllInfoForFriendListUser(self):
        profsList = []
        for i in self.friendshipList:
            prf = {}
            prf['login'] = i.profile.user.login
            prf['last_online'] = i.profile.last_online
            prf['avatar_url'] = i.profile.avatar_url
            profsList.append(prf)

        return {"profiles": profsList}