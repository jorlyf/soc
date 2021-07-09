import styles from './Notification.module.scss';

function Notification(props) {

	const handleClose = () => {
		props.close(false);
	}

	return (
		<div className={styles.notification}>
			<span>{props.msg}</span>
			<img src='btns/closeButton.svg' onClick={handleClose} />
		</div>
	)
}

export default Notification;
