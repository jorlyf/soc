import { useParams } from 'react-router-dom';
import styles from './ServerError.module.scss';

export default function ErrorPage() {
  let { errorID } = useParams();
  errorID = +errorID;

  function getErrorDescription() {
    switch (errorID) {
      case 500:
        return 'парашыч запарашился и умер сервер';
      case 401:
        return 'ты не авторизован в парашыче типа';
    }
  }

  return (
    <div className={styles.main}>

      <div className={styles.message}>
        <span>ошибка {errorID}</span>
        <h1>ошибка случилас</h1>
        <p>{getErrorDescription()}</p>
      </div>

      <img className={styles.errorImage} src='/error.jpg' />
    </div>
  )
}