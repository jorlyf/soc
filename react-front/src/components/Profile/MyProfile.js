import React from 'react';

import FileLoader from '../FileLoader';
import InputField from '../InputField';

import { AppContext } from '../../contexts';
import styles from './Profile.module.scss';
function MyProfile({ profileInfo }) {

    const { setUrlContentViewer } = React.useContext(AppContext)

    const [fileLoaderIsOpen, setFileLoaderIsOpen] = React.useState(false);
    const [inputFieldIsOpen, setInputFieldIsOpen] = React.useState(false);

    const [avatarUrl, setAvatarUrl] = React.useState('');
    const [profileStatus, setProfileStatus] = React.useState('');

    const handleClickAvatar = () => {
        setUrlContentViewer(getUrlAvatar())
    }

    const handleChangeAvatar = () => {
        setFileLoaderIsOpen(true);
    }

    const handleChangeStatus = () => {
        setInputFieldIsOpen(true);
    }

    const getUrlAvatar = () => {
        if (profileInfo.avatarUrl) {
            return `/profileAvatars/${profileInfo.avatarUrl}`;
        } return '/profileAvatars/default.jpg';
    }

    return (
        <>
            {inputFieldIsOpen && <InputField closeFunction={setInputFieldIsOpen} msg='введи новый статус' apiUrl='/uploadProfileStatus' previousValue={profileInfo.status} setNewProfileStatus={setProfileStatus} />}
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
                        <button onClick={handleChangeStatus}>изменить статус</button>
                    </div>
                </div>

                <div className={styles.info}>
                    <p className={styles.login}>
                        {profileInfo.login}
                    </p>
                    {profileStatus
                        ?
                        <p>{profileStatus}</p>
                        :
                        <p>{profileInfo.status && profileInfo.status}</p>
                    }
                </div>
            </div>
        </>
    )
}

export default MyProfile;
