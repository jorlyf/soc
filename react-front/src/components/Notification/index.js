import { ExitBtn } from '../Btns';

import styles from './Notification.module.scss';

function Notification({close, msg}) {

	const handleClose = () => {
		close(false);
	}

	return (
		<div className={styles.notification}>
			<span>{msg}</span>
			<ExitBtn closeFunction={handleClose}/>
		</div>
	)
}

export default Notification;
