from DbBaseClass import DbBaseClass
from models import Posts, PostImages, PostLikes

class DbPost(DbBaseClass):
    def createPost(self, data):
        try:
            newPost = Posts(author_id=data['authorId'], text=data['text'])
            self.addData(newPost)
            self.flushData()

            for image_url in data['images']:
                newPostImage = PostImages(post_id=newPost.id, image_url=image_url)
                self.addData(newPostImage)

            self.commitData()
        except:
            print('ERROR create post')
    
    def getPosts(self):
        posts = Posts.query.all()
        print(posts)