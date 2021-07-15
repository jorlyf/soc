import React from 'react';

import FileLoader from '../FileLoader';
import { AppContext, UserContext } from '../../contexts';
import styles from './Profile.module.scss';
function MyProfile({ profileInfo }) {

    const { setUrlContentViewer } = React.useContext(AppContext)
    const [fileLoaderIsOpen, setFileLoaderIsOpen] = React.useState(false);
    const [avatarUrl, setAvatarUrl] = React.useState('');

    const handleClickAvatar = () => {
        setUrlContentViewer(getUrlAvatar())
    }

    const handleChangeAvatar = async () => {
        setFileLoaderIsOpen(true);
    }

    const getUrlAvatar = () => {
        if (profileInfo.avatarUrl) {
            return `/profileAvatars/${profileInfo.avatarUrl}`;
        } return '/profileAvatars/default.jpg';
    }

    return (
        <>
            {fileLoaderIsOpen && <FileLoader closeFunction={setFileLoaderIsOpen} apiUrl='/uploadAvatar' maxFileSize={4096000} setAvatarUrl={setAvatarUrl} />}
            <span className={styles.isOnline}>{profileInfo.isOnline ? 'на зоне' : 'дрыхнет'}</span>
            <p className={styles.registerDate}>{profileInfo.registerDate && 'сидит с ' + profileInfo.registerDate + ' мск'}</p>
            <div className={styles.main}>
                <div className={styles.mainProfile}>
                    {avatarUrl ?
                        <img onClick={handleClickAvatar} src={`/profileAvatars/${avatarUrl}`} alt='' />
                        :
                        <img onClick={handleClickAvatar} src={getUrlAvatar()} alt='' />
                    }
                    <div>
                        <button onClick={handleChangeAvatar}>изменить фотку</button>
                        <button>изменить статус</button>
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

export default MyProfile;
