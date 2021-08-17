import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import styles from './Profile.module.scss';
import { SimpleButton, HoverButton } from '../../components/Btns';
import { ProfileFriendList } from './ProfileFriendList';
import { useSelector } from 'react-redux';

function OtherProfile() {

	const dispatch = useDispatch();
	const CURRENT_OPENED_PROFILE_DATA = useSelector(state => state.app.CURRENT_OPENED_PROFILE_DATA);

	const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
	const AUTHORIZE_STATUS = useSelector(state => state.auth.AUTHORIZE_STATUS);
	const USER_ID = useSelector(state => state.auth.USER_ID);

	function getAddFriendBtn() {
		if (AUTHORIZE_STATUS && CURRENT_OPENED_PROFILE_DATA.ourFriendship) {
			if (CURRENT_OPENED_PROFILE_DATA.ourFriendship.isAccepted) {
				return <HoverButton value='мой кореш' onClick={handleButtonFriend} textOnHover='больш не кореш' />
			} else if (CURRENT_OPENED_PROFILE_DATA.ourFriendship.requesterId === USER_ID) {
				return <HoverButton value='жду ответ' onClick={handleButtonFriend} textOnHover='пошел нахуй' />
			} else if ((CURRENT_OPENED_PROFILE_DATA.ourFriendship.requesterId === CURRENT_OPENED_PROFILE_DATA.id)) {
				return <SimpleButton value='предлагает стать корешами' onClick={handleButtonFriend} />
			} else {
				return <SimpleButton value='предложить стать корешами' onClick={handleButtonFriend} />
			}
		}
	}

	const handleButtonFriend = async () => {
		console.log(CURRENT_OPENED_PROFILE_DATA.ourFriendship);
		if (AUTHORIZE_STATUS && CURRENT_OPENED_PROFILE_DATA.ourFriendship) {
			if (CURRENT_OPENED_PROFILE_DATA.ourFriendship.isAccepted) {
				const res = await axios.post(`/api/profile/deleteFriend/${CURRENT_OPENED_PROFILE_DATA.id}`, { token: ACCESS_TOKEN });
				if (res.data.status === 200) {
					alert('удалил')
				}
			}
			else if (!CURRENT_OPENED_PROFILE_DATA.ourFriendship.isAccepted) {
				const res = await axios.post(`/api/profile/addFriend/${CURRENT_OPENED_PROFILE_DATA.id}`, { token: ACCESS_TOKEN });
				if (res.data.status === 200) {
					alert('заявка отправлена')
				}
			}
		}
	}
	const handleClickAvatar = () => {
		dispatch({ type: 'SET_CONTENT_VIEWER_DATA', payload: { isVisible: true, url: getUrlAvatar(), type: 'image' } });
	}

	const getUrlAvatar = () => {
		return `/profileAvatars/${CURRENT_OPENED_PROFILE_DATA.avatarUrl}`;
	}

	return (
		<>
			{CURRENT_OPENED_PROFILE_DATA.id ?
				<>
					<span className={styles.isOnline}>{CURRENT_OPENED_PROFILE_DATA.isOnline ? 'на зоне' : 'дрыхнет'}</span>
					<p className={styles.registerDate}>{CURRENT_OPENED_PROFILE_DATA.registerDate && 'сидит с ' + CURRENT_OPENED_PROFILE_DATA.registerDate + ' мск'}</p>
					<div className={styles.main}>
						<div className={styles.mainProfile}>
							<img className={styles.avatarImage} onClick={handleClickAvatar} src={getUrlAvatar()} alt='avatar' />
							<div>
								{AUTHORIZE_STATUS &&
									<>
										<SimpleButton onClick={''} value='шептануть' />
										{getAddFriendBtn()}
									</>
								}
								<ProfileFriendList profileId={CURRENT_OPENED_PROFILE_DATA.id} friends={CURRENT_OPENED_PROFILE_DATA.friends} />
							</div>
						</div>

						<div className={styles.info}>
							<p className={styles.login}>
								{CURRENT_OPENED_PROFILE_DATA.login}
							</p>
							<p>{CURRENT_OPENED_PROFILE_DATA.status && 'пишет о себе:  ' + CURRENT_OPENED_PROFILE_DATA.status}</p>
						</div>
					</div>
				</>
				: <span className={styles.notFound}>нет такого у нас</span>}
		</>
	)
}

export default OtherProfile;
