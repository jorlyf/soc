import React from 'react';
import axios from 'axios';
import { AppContext, UserContext } from '../../contexts';

import styles from './Profile.module.scss';
import { FriendProfileButton } from '../Btns';

function OtherProfile({ profileInfo }) {

    const { token } = React.useContext(UserContext);
    const { setUrlContentViewer } = React.useContext(AppContext);
    const [friendStatus, setFriendStatus] = React.useState(); //0 = null, 1 = myRequest, 2 = hisRequest, 3 = friends

    React.useEffect(() => {
        if (profileInfo.id) {
            (async () => {
                const res = await axios.post(`/checkFriendStatus/${profileInfo.id}`, { 'token': token });
                if (res.data.friendStatus === true) {
                    setFriendStatus(true);
                }
            })()
        }
    }, [profileInfo])

    function getFriendStatus() {
        console.log(friendStatus);
        if (friendStatus === 0)
        {
            return <FriendProfileButton onClick={handleSendFriendAdd} value='предложить стать сокамерниками' />
        }
        if (friendStatus === 1)
        {
            return <FriendProfileButton onClick={handleSendFriendAdd} value='предложить стать сокамерниками' />
        }
    }

    const handleSendFriendAdd = async () => {
        const res = await axios.post(`/beFriends/${profileInfo.id}`, { 'token': token });
        if (res.data.status === 200) {
            alert('заявка отправлена')
        }
    }

    const handleClickAvatar = () => {
        if (profileInfo.avatarUrl) {
            setUrlContentViewer(`/profileAvatars/${profileInfo.avatarUrl}`);
        }
    }

    return (
        <>
            {
                profileInfo.id &&
                <>
                    <span className={styles.isOnline}>{profileInfo.isOnline ? 'на зоне' : 'дрыхнет'}</span>
                    <p className={styles.registerDate}>{profileInfo.registerDate && 'сидит с ' + profileInfo.registerDate + ' мск'}</p>
                    <div className={styles.main}>
                        <div className={styles.mainProfile}>
                            {
                                profileInfo.avatarUrl ?
                                    <img onClick={handleClickAvatar} src={`/profileAvatars/${profileInfo.avatarUrl}`} alt='' />
                                    :
                                    <img onClick={handleClickAvatar} src='/profileAvatars/default.jpg' alt='' />
                            }
                            <div>
                                <button>шептануть</button>
                                {getFriendStatus()}
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
            }
        </>
    )
}

export default OtherProfile;
