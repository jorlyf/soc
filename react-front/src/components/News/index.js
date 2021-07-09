import React from 'react';
import UserContext from '../../UserContext';
import Notification from '../Notification';

function News() {

  const { token } = React.useContext(UserContext);

  const [notificationIsCalled, setNotificationIsCalled] = React.useState(false);
  const callNotification = () => {
    setNotificationIsCalled(true);
  }

  return (
    <div className='content'>
      {notificationIsCalled && <Notification msg='не получилось добавить в друзья' close={setNotificationIsCalled} />}
      <button onClick={callNotification}>
        добавить в др
      </button>
    </div>
  )
}

export default News;
