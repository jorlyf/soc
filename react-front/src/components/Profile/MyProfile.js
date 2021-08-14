import React from 'react';

import FileLoader from '../FileLoader';
import InputField from '../InputField';
import { AppContext } from '../../contexts';

import { Posts } from '../Posts';
import { ProfileFriendList } from './ProfileFriendList';
import { SimpleButton } from '../Btns';

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
            if (avatarUrl) {
                return `/profileAvatars/${avatarUrl}`;
            } else {
                return `/profileAvatars/${profileInfo.avatarUrl}`;
            }
        } return '/profileAvatars/default.jpg';
    }

    return (
        <>
            {inputFieldIsOpen && <InputField closeFunction={setInputFieldIsOpen} msg='введи новый статус' apiUrl='/api/profile/uploadProfileStatus' previousValue={profileInfo.status} setNewProfileStatus={setProfileStatus} />}
            {fileLoaderIsOpen && <FileLoader closeFunction={setFileLoaderIsOpen} apiUrl='/api/profile/uploadAvatar' maxFileSize={4096000} setAvatarUrl={setAvatarUrl} />}
            <span className={styles.isOnline}>{profileInfo.isOnline ? 'на зоне' : 'дрыхнет'}</span>
            <p className={styles.registerDate}>{profileInfo.registerDate && 'сидит с ' + profileInfo.registerDate + ' мск'}</p>
            <div className={styles.main}>
                <div className={styles.mainProfile}>
                    {avatarUrl ?
                        <img className={styles.avatarImage} onClick={handleClickAvatar} src={`/profileAvatars/${avatarUrl}`} alt='' />
                        :
                        <img className={styles.avatarImage} onClick={handleClickAvatar} src={getUrlAvatar()} alt='' />
                    }
                    <div>
                        <SimpleButton onClick={handleChangeAvatar} value='изменить фотку' />
                        <SimpleButton onClick={handleChangeStatus} value='изменить статус' />
                        <ProfileFriendList profileId={profileInfo.id} friends={profileInfo.friends} />
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
                    <Posts posts={[]} />
                </div>
            </div>
        </>
    )
}

export default MyProfile;
