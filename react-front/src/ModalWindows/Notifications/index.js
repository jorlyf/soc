import styles from './Notification.module.scss';

import { CancelButton } from '../../components/Btns';
import { useDispatch } from 'react-redux';

function Notifications({ data = [] }) {

	const dispatch = useDispatch();

	const handleClose = (index) => {
		data.splice(index, 1);
		dispatch({ type: 'SET_NOTIFICATIONS_DATA', payload: data });
	}

	return (
		<div className={styles.main}>
			{data.map((notification, index) => (
				<div className={styles.notification} key={index}>
					<span>{notification.message}</span>
					<div className={styles.closeButton}>
						<CancelButton onClick={() => handleClose(index)} />
					</div>
				</div>
			))}
		</div>
	)
}

export default Notifications;
