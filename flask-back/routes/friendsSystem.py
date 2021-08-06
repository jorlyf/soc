from sqlalchemy.sql.elements import or_, and_
from routes.DbAuth import DbAuth
from models import Friendships

dbAuth = DbAuth()

class FriendSystem:
    def __init__(self, user):
        self.id = user.id

        self.friendshipList = Friendships.query.filter(or_(Friendships.a_id==self.id, Friendships.b_id==self.id)).all()

        self.__acceptedFriendProfiles = []
        self.__notAcceptedFriendProfiles = []

        if self.friendshipList:
            self.__isEmpty = False
        else:
            self.__isEmpty = True

    def __getFriendProfile(self, friendship):
        if friendship.a_id == self.id:
            friendProfile = dbAuth.getUserById(friendship.b_id).profile
        elif friendship.b_id == self.id:
            friendProfile = dbAuth.getUserById(friendship.a_id).profile
            
        return friendProfile

    def __takeFriendList(self):
        for friendship in self.friendshipList:
            profile = self.__getFriendProfile(friendship)

            if friendship.is_accepted:
                self.__acceptedFriendProfiles.append(profile)
            else:
                self.__notAcceptedFriendProfiles.append(profile)

    def __serializeFriendProfiles(self, friends):
        serialized = []
        for profile in friends:
            j = {}
            j['login'] = profile.user.login
            j['avatar_url'] = profile.avatar_url
            j['last_online'] = profile.last_online
            serialized.append(j)
        return serialized

    def getSerializedAcceptedFriends(self):
        if not self.__isEmpty:
            if not self.__acceptedFriendProfiles:
                self.__takeFriendList()
            return self.__serializeFriendProfiles(self.__acceptedFriendProfiles)
        else:
            return []

    def getSerializedNotAcceptedFriends(self):
        if not self.__isEmpty:
            if not self.__notAcceptedFriendProfiles:
                self.__takeFriendList()
            return self.__serializeFriendProfiles(self.__notAcceptedFriendProfiles)
        else:
            return []
