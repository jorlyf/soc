import React from 'react';
import { Redirect } from 'react-router';
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

  const [isMyProfile, setIsMyProfile] = React.useState(false);
  const [wasFetched, setWasFetched] = React.useState(false);

  React.useEffect(() => {
    console.log(ACCESS_TOKEN);
    if (id) {
      (async () => {
        const res = await axios.post(`/api/profile/getProfile/${id}`, { token: ACCESS_TOKEN });
        setWasFetched(true);
        if (res.data.status === 200) {
          setProfileInfo(res.data.info);
          setIsMyProfile(USER_ID === +id);
        }
      })();
    }
  }, [id, ACCESS_TOKEN]);

  if (+id === 0) { // 0 - unlogged
    return (<Redirect to='/login' />)
  }

  return (
    <div className='content'>
      {wasFetched
        && (
          isMyProfile
            ?
            <MyProfile profileInfo={profileInfo} />
            :
            <OtherProfile profileInfo={profileInfo} />

        )}
    </div>
  )
}

export default Profile;
