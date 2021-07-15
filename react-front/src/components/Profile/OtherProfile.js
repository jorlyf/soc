import styles from './Profile.module.scss';
function OtherProfile({ profileInfo }) {
    return (
        <>
            <span className={styles.isOnline}>{profileInfo.isOnline ? 'на зоне' : 'дрыхнет'}</span>
            <p className={styles.registerDate}>{profileInfo.registerDate && 'сидит с ' + profileInfo.registerDate + ' мск'}</p>
            <div className={styles.main}>
                <div className={styles.mainProfile}>
                    {
                        profileInfo.avatarUrl ?
                            <img src={`/profileAvatars/${profileInfo.avatarUrl}`} width={250} height={250} alt='' />
                            :
                            <img src='/profileAvatars/default.jpg' width={250} height={250} alt='' />
                    }
                    <div>
                        <button>оставить записку</button>
                        <button>стать корешами</button>
                    </div>
                </div>

                <div className={styles.info}>
                    <p className={styles.login}>
                        {profileInfo.login}
                    </p>
                    <p>{profileInfo.status && 'пишет о себе:  ' + profileInfo.status}</p>
                </div>
            </div>
        </>
    )
}

export default OtherProfile;
