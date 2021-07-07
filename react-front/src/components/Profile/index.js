import React from 'react';
import axios from 'axios';
import styles from './Profile.module.scss';

function Profile( match ) {
  
  const [profileInfo, setProfileInfo] = React.useState({});
  console.log(match);

  React.useEffect(() => {
    async function fetch() {
      //const res = await axios.get(`/getUserById?${match.params.id}`);
      //console.log(res.data);
      //setProfileInfo(res.data);
    }
    fetch();
  }, []);

  return (
    <div className='content'>
      <span className={styles.isOnline}>{profileInfo.isOnline ? 'на зоне' : 'дрыхнет'}</span>
      <div className={styles.main}>
        <div className={styles.mainProfile}>
          <img src='icon.jpg' width={250} height={250} alt='' />
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
