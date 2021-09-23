from models import Profiles

def getProfileByID(id):
  return Profiles.query.filter_by(id=id).first()