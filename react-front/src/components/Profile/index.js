import React from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import OtherProfile from './OtherProfile';
import MyProfile from './MyProfile';
import { useSelector } from 'react-redux';

function Profile() {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = React.useState({});

  const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
  const USER_ID = useSelector(state => state.auth.USER_ID);

  const [isMyProfile, setIsMyProfile] = React.useState();

  React.useEffect(() => {
    if (id && ACCESS_TOKEN) {
      (async () => {
        const res = await axios.post(`/getProfileById/${id}`, { token: ACCESS_TOKEN });
        if (res.data.status === 200) {
          setProfileInfo(res.data.info);
          setIsMyProfile(USER_ID === +id);
        }
      })();
    }
  }, [id, ACCESS_TOKEN]);

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
