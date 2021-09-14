from DbBaseClass import DbBaseClass
from models import UserPosts, UserPostImages, UserPostLikes, UserPostComments, UserCommentImages
from utils.uploads import saveImage, generateHash
from sqlalchemy import desc


class DbPost(DbBaseClass):
    def createPost(self, data):
        try:
            newPost = UserPosts(author_id=data['authorId'], text=data['text'])
            self.addData(newPost)
            self.flushData()

            types = {'images': ['image/png', 'image/jpeg']}
            for file in data['files']:
                if file.content_type in types['images']:
                    file.filename = generateHash()
                    path = '\\react-front\\public\\postImages\\'
                    saveImage(file, path)
                    newPostImage = UserPostImages(post_id=newPost.id,
                                              image_url=file.filename)
                    self.addData(newPostImage)

            self.commitData()
            return {"status": 200}
        except:
            print('ERROR create post')
            return {"status": 400}

    def getUserPosts(self):
        posts = UserPosts.query.order_by(desc(UserPosts.id)).all()
        data = []
        for post in posts:
            data.append(post.serialize())
        return data
