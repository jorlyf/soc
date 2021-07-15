from datetime import date, datetime
from pytz import timezone
def getTime(): #without ms
    #return datetime.datetime.now(timezone('Europe/Moscow')).replace(microsecond=0)
    return datetime.now(timezone('Europe/Moscow')).replace(microsecond=0).replace(tzinfo=None)

def formatTime(date):
    date = str(date)
    days = date[8:10]
    month = date[5:7]
    year = date[:4]
    newDate = f'{days}-{month}-{year} {date[11:]}'
    return newDate
