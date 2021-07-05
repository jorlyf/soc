import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';

function Header() {
    return (
        <header>
            <div className={styles.logo}>
                <Link to='/'>
                    <img src={process.env.PUBLIC_URL + '/icon.jpg'} alt='' />
                    <span>парашыч</span>
                </Link>
            </div>
            <div className={styles.auth}>
                <Link to='/login'>
                    зайти в парашу
                </Link>
                <button onClick={Logout}>
                    уйти с параши
                </button>
            </div>
        </header>
    )
}

export default Header;
