from DbBaseClass import DbBaseClass
from models import Posts, PostImages, PostLikes, PostComments, CommentImages

class DbPost(DbBaseClass):
    def createPost(self, data):
        try:
            newPost = Posts(author_id=data['authorId'], text=data['text'])
            self.addData(newPost)
            self.flushData()

            for file in data['files']:
                if file['type'] == 'image':
                    newPostImage = PostImages(post_id=newPost.id, image_url=file['data'])
                    self.addData(newPostImage)

            self.commitData()
        except:
            print('ERROR create post')

    def getPosts(self):
        posts = Posts.query.all()
        print(posts)
