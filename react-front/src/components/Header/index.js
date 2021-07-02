import styles from './Header.module.scss';

function Header() {
    return(
        <header>
            <div className={styles.logo}>
                <img src={process.env.PUBLIC_URL + '/logo.svg'} alt='Лого'/>
                <span>парашыч</span>
            </div>
            <div className={styles.auth}>
                <span>
                    уйти c параши
                </span>
            </div>
        </header>
    )
}

export default Header;
