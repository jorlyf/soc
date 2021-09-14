from flask import Blueprint, request

from routes.JwtAuth import JwtAuth
from routes.DbAuth import DbAuth
from routes.DbPost import DbPost
from routes.jwtRequired import tokenRequired

posts = Blueprint('posts', __name__)
jwtAuth = JwtAuth()
dbAuth = DbAuth()
dbPost = DbPost()


@posts.route('/api/posts/getUserPosts', methods=['GET'])
def getPosts():
    posts = dbPost.getUserPosts()
    return {"status": 200, "posts": posts}


@posts.route('/api/posts/createPost', methods=['GET', 'POST'])
def createPost():
    token = request.form.get('token')
    text = request.form.get('text')
    files = request.files.getlist('files')
    if token:
        encoded = tokenRequired(token)
        if encoded['status']:
            data = {}
            data['authorId'] = encoded['id']
            data['text'] = text
            data['files'] = files
            post = dbPost.createPost(data)
            status = post["status"]
            
            return {"status": status}

        else:
            return {"status": 401}
    return {"status": 401}
