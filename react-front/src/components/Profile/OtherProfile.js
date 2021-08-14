import React from 'react';
import axios from 'axios';
import { AppContext } from '../../contexts';

import styles from './Profile.module.scss';
import { SimpleButton, HoverButton } from '../Btns';
import { ProfileFriendList } from './ProfileFriendList';
import { useSelector } from 'react-redux';

function OtherProfile({ profileInfo }) {

    const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
    const AUTHORIZE_STATUS = useSelector(state => state.auth.AUTHORIZE_STATUS);
    const USER_ID = useSelector(state => state.auth.USER_ID);

    const { setUrlContentViewer } = React.useContext(AppContext);

    function getAddFriendBtn() {
        if (AUTHORIZE_STATUS && profileInfo.ourFriendship) {
            if (profileInfo.ourFriendship.isAccepted) {
                return <HoverButton value='мой кореш' onClick={handleBtnFriend} textOnHover='больш не кореш' />
            } else if (profileInfo.ourFriendship.requesterId === USER_ID) {
                return <HoverButton value='жду ответ' onClick={handleBtnFriend} textOnHover='пошел нахуй' />
            } else if ((profileInfo.ourFriendship.requesterId === profileInfo.id)) {
                return <SimpleButton value='предлагает стать корешами' onClick={handleBtnFriend} />
            } else {
                return <SimpleButton value='предложить стать корешами' onClick={handleBtnFriend} />
            }
        }
    }

    const handleBtnFriend = async () => {
        console.log(profileInfo.ourFriendship);
        if (AUTHORIZE_STATUS && profileInfo.ourFriendship) {
            if (profileInfo.ourFriendship.isAccepted) {
                const res = await axios.post(`/api/profile/deleteFriend/${profileInfo.id}`, { 'token': ACCESS_TOKEN });
                if (res.data.status === 200) {
                    alert('удалил')
                }
            }
            else if (!profileInfo.ourFriendship.isAccepted) {
                const res = await axios.post(`/api/profile/addFriend/${profileInfo.id}`, { 'token': ACCESS_TOKEN });
                if (res.data.status === 200) {
                    alert('заявка отправлена')
                }
            }
        }
    }
    const handleClickAvatar = () => {
        if (profileInfo.avatarUrl) {
            setUrlContentViewer(`/profileAvatars/${profileInfo.avatarUrl}`);
        }
    }

    return (
        <>
            {profileInfo.id ?
                <>
                    <span className={styles.isOnline}>{profileInfo.isOnline ? 'на зоне' : 'дрыхнет'}</span>
                    <p className={styles.registerDate}>{profileInfo.registerDate && 'сидит с ' + profileInfo.registerDate + ' мск'}</p>
                    <div className={styles.main}>
                        <div className={styles.mainProfile}>
                            {
                                profileInfo.avatarUrl ?
                                    <img className={styles.avatarImage} onClick={handleClickAvatar} src={`/profileAvatars/${profileInfo.avatarUrl}`} alt='' />
                                    :
                                    <img className={styles.avatarImage} onClick={handleClickAvatar} src='/profileAvatars/default.jpg' alt='' />
                            }
                            <div>
                                {AUTHORIZE_STATUS &&
                                    <>
                                        <SimpleButton onClick={''} value='шептануть' />
                                        {getAddFriendBtn()}
                                    </>
                                }
                                <ProfileFriendList profileId={profileInfo.id} friends={profileInfo.friends} />
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
                : <span className={styles.notFound}>нет такого у нас</span>}
        </>
    )
}

export default OtherProfile;
