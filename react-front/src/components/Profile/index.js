import React from 'react';

import { UserContext } from '../../contexts';
import Logout from '../Auth/Logout';

import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';
import OtherProfile from './OtherProfile';
import MyProfile from './MyProfile';

function Profile() {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = React.useState({});
  const { token, isLogged, setNotificationIsCalled, setMsgNotification } = React.useContext(UserContext);
  const [isMyProfile, setIsMyProfile] = React.useState(false);
  async function fetchId() {
    const res = await axios.post('/auth/fetchId', { 'data': token })
    if (res.data.status === 200) {
      const myId = res.data.id;
      if (+myId === +id) {
        setIsMyProfile(true);
      }
      localStorage.setItem('userId', res.data.id);
    } else {
      Logout();
    }
  }

  React.useEffect(() => {
    if (isLogged) {
      { fetchId() };
      (async () => {
        const res = await axios.get(`/getProfileById/${id}`);
        console.log(res.data.status);
        if (res.data.status === 200) {
          setProfileInfo(res.data.info);
        }
      })();
    }
  }, []);

  if (!isLogged) {
    return (<Redirect to='/login' />)
  }

  return (
    <div className='content'>
      {isMyProfile ?
        <MyProfile profileInfo={profileInfo} />
        :
        <OtherProfile profileInfo={profileInfo} />
      }
    </div>
  )
}

export default Profile;
