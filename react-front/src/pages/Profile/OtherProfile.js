import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { SimpleButton, HoverButton, MenuButton } from '../../components/Btns';
import { ProfileFriendList } from './ProfileFriendList';
import { Posts } from '../../components/Posts';

import styles from './Profile.module.scss';

function OtherProfile() {

	const dispatch = useDispatch();
	const CURRENT_OPENED_PROFILE_DATA = useSelector(state => state.app.CURRENT_OPENED_PROFILE_DATA);

	const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
	const AUTHORIZE_STATUS = useSelector(state => state.auth.AUTHORIZE_STATUS);
	const USER_ID = useSelector(state => state.auth.USER_ID);

	const getFriendButton = () => {
		if (AUTHORIZE_STATUS && CURRENT_OPENED_PROFILE_DATA.ourFriendship) {
			const friendship = CURRENT_OPENED_PROFILE_DATA.ourFriendship;
			switch (true) {
				case (friendship.isAccepted): // friends
					return (
						<HoverButton
							value='мы кореша'
							valueOnHover='больш не кореш'
							onClick={() => handleFriendButton('deleteFriendship')}
						/>
					);
				case (!friendship.requesterId): // not friends
					return (
						<SimpleButton
							value='предложить стать корешами'
							onClick={() => handleFriendButton('requestFriendship')}
						/>
					);
				case (friendship.requesterId === USER_ID):
					return (
						<HoverButton
							value='предложение отправлено'
							valueOnHover='отменить'
							onClick={() => handleFriendButton('cancelFriendship')}
						/>
					);
				case (friendship.requesterId === CURRENT_OPENED_PROFILE_DATA.id):
					return (
						<MenuButton
							menuButtonValue='предлагает стать корешами'
							menuCells={[
								{ value: 'согласиться', onClick: () => handleFriendButton('acceptFriendship') },
								{ value: 'отказаться', onClick: () => handleFriendButton('cancelFriendship') }
							]}
						/>
					);

			}
		}
	}

	const handleFriendButton = async (action) => {
		switch (action) {
			case 'requestFriendship': {
				const res = await axios.post(`/api/profile/addFriend/${CURRENT_OPENED_PROFILE_DATA.id}`, { token: ACCESS_TOKEN });
				if (res.data.status === 200) {
					dispatch({ type: 'SET_CURRENT_OPENED_PROFILE_DATA_OUR_FRIENDSHIP', payload: { isAccepted: false, requesterId: USER_ID } });
				}
				break;
			}
			case 'deleteFriendship': {
				const res = await axios.post(`/api/profile/deleteFriend/${CURRENT_OPENED_PROFILE_DATA.id}`, { token: ACCESS_TOKEN });
				if (res.data.status === 200) {
					dispatch({ type: 'SET_CURRENT_OPENED_PROFILE_DATA_OUR_FRIENDSHIP', payload: { isAccepted: false, requesterId: 0 } });
				};
				break;
			}
			case 'acceptFriendship': {
				const res = await axios.post(`/api/profile/addFriend/${CURRENT_OPENED_PROFILE_DATA.id}`, { token: ACCESS_TOKEN });
				if (res.data.status === 200) {
					dispatch({ type: 'SET_CURRENT_OPENED_PROFILE_DATA_OUR_FRIENDSHIP', payload: { isAccepted: true, requesterId: CURRENT_OPENED_PROFILE_DATA.id } });
				}
				break;
			}
			case 'cancelFriendship': {
				const res = await axios.post(`/api/profile/deleteFriend/${CURRENT_OPENED_PROFILE_DATA.id}`, { token: ACCESS_TOKEN });
				if (res.data.status === 200) {
					dispatch({ type: 'SET_CURRENT_OPENED_PROFILE_DATA_OUR_FRIENDSHIP', payload: { isAccepted: false, requesterId: 0 } });
				};
				break;
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
										{getFriendButton()}
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
							<Posts userID={CURRENT_OPENED_PROFILE_DATA.id} />
						</div>
					</div>
				</>
				: <span className={styles.notFound}>нет такого у нас</span>}
		</>
	)
}

export default OtherProfile;
