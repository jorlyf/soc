import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logout from '../../pages/Auth/Logout';

import styles from './Header.module.scss';

function Header() { 
    const AUTHORIZE_STATUS = useSelector((state) => state.auth.AUTHORIZE_STATUS);

    return (
        <header>
            <div className={styles.logo}>
                <Link to='/'>
                    <img src={process.env.PUBLIC_URL + '/icon.jpg'} alt='' />
                    <span>парашыч</span>
                </Link>
            </div>
            <div className={styles.auth}>
                {AUTHORIZE_STATUS ?
                    <button onClick={Logout}>
                        уйти с параши
                    </button> :
                    <Link to='/login'>
                        зайти в парашу
                    </Link>}
            </div>
        </header>
    )
}

export default Header;
