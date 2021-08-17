import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Posts } from '../../components/Posts';
import { ProfileFriendList } from './ProfileFriendList';
import { SimpleButton } from '../../components/Btns';

import styles from './Profile.module.scss';

function MyProfile() {

	const dispatch = useDispatch();
	const CURRENT_OPENED_PROFILE_DATA = useSelector(state => state.app.CURRENT_OPENED_PROFILE_DATA);

	const handleClickAvatar = () => {
		dispatch({
			type: 'SET_CONTENT_VIEWER_DATA',
			payload:
			{
				isVisible: true,
				url: getUrlAvatar(),
				type: 'image'
			}
		});
	}

	const handleChangeAvatarButton = () => {
		dispatch({
			type: 'SET_FILE_LOADER_DATA',
			payload:
			{
				isVisible: true,
				filetype: 'image',
				maxFilesCount: 10,
				maxFileSize: 8192000,
				isMultiple: true, // remove
				message: 'грузи фотку',
				apiUrl: '/api/profile/uploadAvatar'
			}
		})
	}

	const handleChangeStatusButton = () => {
		/////
	}

	const getUrlAvatar = () => {
		return `/profileAvatars/${CURRENT_OPENED_PROFILE_DATA.avatarUrl}`;
	}

	return (
		<>
			<span className={styles.isOnline}>{CURRENT_OPENED_PROFILE_DATA.isOnline ? 'на зоне' : 'дрыхнет'}</span>
			<p className={styles.registerDate}>{CURRENT_OPENED_PROFILE_DATA.registerDate && 'сидит с ' + CURRENT_OPENED_PROFILE_DATA.registerDate + ' мск'}</p>
			<div className={styles.main}>
				<div className={styles.mainProfile}>
					<img className={styles.avatarImage} onClick={handleClickAvatar} src={getUrlAvatar()} alt='avatar' />
					<div>
						<SimpleButton onClick={handleChangeAvatarButton} value='сменить фотку' />
						<SimpleButton onClick={handleChangeStatusButton} value='сменить статус' />
						<ProfileFriendList profileId={CURRENT_OPENED_PROFILE_DATA.id} friends={CURRENT_OPENED_PROFILE_DATA.friends} />
					</div>
				</div>

				<div className={styles.info}>

					<p className={styles.login}>
						{CURRENT_OPENED_PROFILE_DATA.login}
					</p>

					<p>{CURRENT_OPENED_PROFILE_DATA.status && CURRENT_OPENED_PROFILE_DATA.status}</p>

					<Posts posts={[]} />
				</div>
			</div>
		</>
	)
}

export default MyProfile;
