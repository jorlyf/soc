import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Posts } from '../../components/Posts';
import { InputField } from '../../components/InputField';
import { ProfileFriendList } from './ProfileFriendList';
import { SimpleButton } from '../../components/Btns';

import styles from './Profile.module.scss';

function MyProfile() {

	const dispatch = useDispatch();
	const CURRENT_OPENED_PROFILE_DATA = useSelector(state => state.app.CURRENT_OPENED_PROFILE_DATA);
	const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);

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
				maxFilesCount: 1,
				maxFileSize: 8192000,
				isMultiple: false,
				message: 'грузи фотку',
				apiUrl: '/api/profile/uploadAvatar',
			}
		})
	}

	const handleChangeStatus = (text) => {
		dispatch({ type: "SET_CURRENT_OPENED_PROFILE_DATA_STATUS", payload: text });
	}

	const handleSubmitStatus = async () => {
		try {
			const { data } = await axios.post('/api/profile/uploadProfileStatus', { data: CURRENT_OPENED_PROFILE_DATA.status, token: ACCESS_TOKEN });
			if (!data.status === 200) {
				dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'чет не получилось обновить статус' } });
			}
		} catch (error) {
			console.error(error);
			dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'сервер помирает' } });
		}
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
						<ProfileFriendList profileId={CURRENT_OPENED_PROFILE_DATA.id} friends={CURRENT_OPENED_PROFILE_DATA.friends} />
					</div>
				</div>

				<div className={styles.info}>

					<p className={styles.login}>
						{CURRENT_OPENED_PROFILE_DATA.login}
					</p>

					<span className={styles.status}>
						<InputField
							value={CURRENT_OPENED_PROFILE_DATA.status && CURRENT_OPENED_PROFILE_DATA.status}
							dispatchFunction={handleChangeStatus}
							handleSubmitAfterChange={handleSubmitStatus}
							placeholder='поставить чёткий статус'
							maxValueLength={128}
							oneRow={true}
						/>
					</span>

					<Posts userID={CURRENT_OPENED_PROFILE_DATA.id} isMyPosts={true} />
				</div>
			</div>
		</>
	)
}

export default MyProfile;
