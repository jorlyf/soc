import React, { useState } from 'react';
import UserContext from '../../UserContext';

import Logout from '../Auth/Logout';

import styles from './Header.module.scss';
import { Link, Redirect } from 'react-router-dom';

function Header() {
    const { isLogged } = React.useContext(UserContext);

    return (
        <header>
            <div className={styles.logo}>
                <Link to='/'>
                    <img src={process.env.PUBLIC_URL + '/icon.jpg'} alt='' />
                    <span>парашыч</span>
                </Link>
            </div>
            <div className={styles.auth}>
                {isLogged ?
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
