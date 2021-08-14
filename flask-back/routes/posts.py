from flask import Blueprint, request

from routes.JwtAuth import JwtAuth
from routes.DbAuth import DbAuth
from routes.DbPost import DbPost
from routes.jwtRequired import tokenRequired

posts = Blueprint('posts', __name__)
jwtAuth = JwtAuth()
dbAuth = DbAuth()
dbPost = DbPost()

@posts.route('/api/posts/createPost', methods=['GET', 'POST'])
def createPost():
    req = request.get_json(force=True)
    token = req.get('token')
    postData = req.get('data')
    print(postData)
    if token:
        encoded = tokenRequired(token)
        if encoded['status'] == True:
            data = {}
            userId = encoded['id']
            data['id'] = userId

            
        else:
            return {"status": 401}
    return {"status": 401}
