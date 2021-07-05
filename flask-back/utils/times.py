import datetime
def getTime(): #without ms
    return datetime.datetime.now().replace(microsecond=0)

