import React from 'react';

import UserContext from '../../UserContext';
import axios from 'axios';
import styles from './Profile.module.scss';
import { Redirect, useParams } from 'react-router-dom';

function Profile() {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = React.useState({});
  const { isLogged } = React.useContext(UserContext);

  React.useEffect(() => {
    async function fetch() {
      const res = await axios.get(`/getProfileById/${id}`);
      console.log(res.data.status);
      if (res.data.status === 200) {
        setProfileInfo(res.data);
      }
    }
    if (isLogged) {
      fetch();
    }
  }, []);

  if (!isLogged) {
    return (<Redirect to='/login' />)
  }

  return (
    <div className='content'>
      <span className={styles.isOnline}>{profileInfo.isOnline ? 'на зоне' : 'дрыхнет'}</span>
      <div className={styles.main}>
        <div className={styles.mainProfile}>
          <img src={window.location.origin + '/profileAvatars/icon.jpg'} width={250} height={250} alt='' />
          <div>
            <p>оставить записку</p>
          </div>
        </div>

        <div className={styles.info}>
          <p>
            {profileInfo.login}
          </p>
          <p>{profileInfo.profileStatus && 'пишет о себе:  ' + profileInfo.profileStatus}</p>
          <p>{profileInfo.profileRegisterDate && 'сидит с ' + profileInfo.profileRegisterDate}</p>
        </div>
      </div>

    </div>
  )
}

export default Profile;
