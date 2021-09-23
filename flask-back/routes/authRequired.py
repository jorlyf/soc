from flask import request
from functools import wraps
from routes.JwtAuth import JwtAuth

jwtAuth = JwtAuth()


class AuthRequired:
    def __init__(self, options={}):
        self.options = options

    def __call__(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if self.options.get("type") == "FormData":
                token = request.form.get('token')
            else:
                req = request.get_json(force=True)
                token = req.get('token')

            decoded = jwtAuth.decodeToken(token)
            if decoded["status"] == 200:
                requesterID = decoded["payload"]["id"]
                return func(requesterID=requesterID, *args, **kwargs)
            else:
                return {"status": 401}

        return wrapper


class AuthOptional:
    def __call__(self, func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            req = request.get_json(force=True)
            token = req.get('token')
            requesterID = None

            decoded = jwtAuth.decodeToken(token)
            if decoded["status"] == 200:
                requesterID = decoded["payload"]["id"]
            return func(requesterID=requesterID, *args, **kwargs)
            
        return wrapper