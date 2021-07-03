import styles from './Profile.module.scss';

function Profile(props) {

  return (
    <div className='content'>
      <span className={styles.isOnline}>{props.isOnline ? 'на зоне' : 'дрыхнет'}</span>
      <div className={styles.main}>
        <div className={styles.mainProfile}>
          <img src='icon.jpg' width={250} height={250} alt='' />
          <div>
            <p>оставить записку</p>
          </div>
        </div>

        <div className={styles.info}>
          <p>пишет о себе: {props.profileStatus ? props.profileStatus : 'ниче не пишет'}</p>
          <p>сидит с {props.profileRegisterDate}</p>
        </div>
      </div>

    </div>
  )
}

export default Profile;
