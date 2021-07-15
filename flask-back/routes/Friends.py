from dataBase import db


class Friends:
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
        print()
