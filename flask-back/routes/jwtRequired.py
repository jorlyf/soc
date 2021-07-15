from routes.JwtAuth import JwtAuth
jwtAuth = JwtAuth()

def tokenRequired(token):
    decoded = jwtAuth.decodeToken(token)
    if decoded['status'] == 200:
        return {'status': True, 'id': decoded['token']['id']}
    else: return {'status': False}
    