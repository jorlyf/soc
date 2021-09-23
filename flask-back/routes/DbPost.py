from DbBaseClass import DbBaseClass
from models import UserPosts, UserPostImages, UserPostLikes, UserPostComments, UserPostCommentImages
from utils.uploads import saveImage, generateHash


class DbPost(DbBaseClass):
    def createPost(self, data):
        try:
            newPost = UserPosts(author_id=data['authorID'], text=data['text'])
            self.addData(newPost)
            self.flushData()

            images = []
            types = {'images': ['image/png', 'image/jpeg']}
            for file in data['files']:
                if file.content_type in types['images']:
                    file.filename = generateHash()
                    path = '\\react-front\\public\\postImages\\'
                    saveImage(file, path)
                    newPostImage = UserPostImages(post_id=newPost.id,
                                                  image_url=file.filename)
                    self.addData(newPostImage)
                    self.flushData()
                    images.append({"id": newPostImage.id, "url": newPostImage.image_url})

            self.commitData()
            return {"status": 200, "id": newPost.id, "images": images }
        except:
            print('ERROR create post')
            return {"status": 400}

    def deletePost(self, data):
        post = UserPosts.query.filter_by(id=data["postID"],
                                         author_id=data["authorID"]).first()
        if post:
            try:
                self.db.session.delete(post)
                self.commitData()
                return {"status": 200}
            except:
                print("error delete post from db")
                return {"status": 400}

        return {"status": 404}

    def getUserPosts(self, userProfile):
        posts = userProfile.posts
        posts.reverse()
        data = []
        for post in posts:
            data.append(post.serialize())
        return data
