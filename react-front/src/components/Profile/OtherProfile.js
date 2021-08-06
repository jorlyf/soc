import React from 'react';
import axios from 'axios';
import { AppContext } from '../../contexts';

import styles from './Profile.module.scss';
import { SimpleButton, HoverButton } from '../Btns';
import { useSelector } from 'react-redux';

function OtherProfile({ profileInfo }) {

    const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
    const AUTHORIZE_STATUS = useSelector(state => state.auth.AUTHORIZE_STATUS);
    const USER_ID = useSelector(state => state.auth.USER_ID);

    const { setUrlContentViewer } = React.useContext(AppContext);

    function getAddFriendBtn() {
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

    const handleBtnFriend = async () => {
        if (AUTHORIZE_STATUS) {
            if (profileInfo.ourFriendship.isAccepted) {
                const res = await axios.post(`/deleteFriend/${profileInfo.id}`, { 'token': ACCESS_TOKEN });
                if (res.data.status === 200) {
                    alert('удалил')
                }
            }
            else if (!profileInfo.ourFriendship.isAccepted) {
                const res = await axios.post(`/addFriend/${profileInfo.id}`, { 'token': ACCESS_TOKEN });
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
            {
                profileInfo.id ?
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
                                {AUTHORIZE_STATUS &&
                                    <div>
                                        <SimpleButton onClick={''} value='шептануть' />
                                        {getAddFriendBtn()}
                                    </div>
                                }
                            </div>

                            <div className={styles.info}>
                                <p className={styles.login}>
                                    {profileInfo.login}
                                </p>
                                <p>{profileInfo.status && 'пишет о себе:  ' + profileInfo.status}</p>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <span className={styles.isOnline}>нет такого профиля</span>
                    </>
            }
        </>
    )
}

export default OtherProfile;
