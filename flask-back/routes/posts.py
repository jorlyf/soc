from flask import Blueprint, request

from routes.JwtAuth import JwtAuth
from routes.DbAuth import DbAuth
from routes.DbPost import DbPost
from routes.authRequired import AuthOptional, AuthRequired

from utils.fastModels import getProfileByID

posts = Blueprint('posts', __name__)
jwtAuth = JwtAuth()
dbAuth = DbAuth()
dbPost = DbPost()


@posts.route('/api/posts/getUserPosts/<int:userID>', methods=['GET', "POST"])
@AuthOptional()
def getUserPosts(requesterID, userID):
    profile = getProfileByID(userID)
    if profile:
        posts = dbPost.getUserPosts(profile)
        return {"status": 200, "posts": posts}

    return {"status": 400, "posts": []}


@posts.route('/api/posts/createPost', methods=['GET', 'POST'])
@AuthRequired(options={"type": "FormData"})
def createPost(requesterID):
    text = request.form.get('text')
    files = request.files.getlist('files')
    data = {}
    data['authorID'] = requesterID
    data['text'] = text
    data['files'] = files

    return dbPost.createPost(data)


@posts.route("/api/posts/deleteMyPost/<int:postID>", methods=["GET", "POST"])
@AuthRequired()
def deletePost(requesterID, postID):
    return {
        "status":
        dbPost.deletePost({
            "postID": postID,
            "authorID": requesterID
        })["status"]
    }


@posts.route('/api/posts/setLike/<int:postID>', methods=['GET', 'POST'])
@AuthRequired()
def setLike(requesterID, postID):
    # set
    return {"status": 200}