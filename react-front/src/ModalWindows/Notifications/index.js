import styles from './Notification.module.scss';

import { ExitButton } from '../../components/Btns';

function Notification({close, msg}) {

	const handleClose = () => {
		close(false);
	}

	return (
		<div className={styles.notification}>
			<span>{msg}</span>
			<ExitButton closeFunction={handleClose}/>
		</div>
	)
}

export default Notification;
