import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

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
                <Link to='logout'>
                    уйти с параши
                </Link>
            </div>
        </header>
    )
}

export default Header;
