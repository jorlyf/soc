import { useDispatch } from 'react-redux';
import styles from './ConfirmWindow.module.scss';

function ConfirmWindow({ data }) {
  const dispatch = useDispatch();

  const handleTrue = () => {
    if (data.onTrue) {
      data.onTrue();
    }
    handleClose();
  }
  const handleFalse = () => {
    if (data.onFalse) {
      data.onFalse();
    }
    handleClose();
  }
  const handleClose = () => {
    dispatch({ type: 'SET_CONFIRM_WINDOW_DATA', payload: {} });
  }

  return (
    <div className={styles.main}>
      <span>{data.text}</span>
      <div className={styles.buttons}>
        <button onClick={handleTrue}>Да</button>
        <button onClick={handleFalse}>Нет</button></div>
    </div>
  )
}

export default ConfirmWindow;