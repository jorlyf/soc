import React from 'react';

import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts';
import styles from './Navigator.module.scss';

function Navigator() {
  const { currentUserId, isLogged } = React.useContext(UserContext);

  const navigationList = [
    { title: 'стенгазета', url: '/' },
    { title: 'моя параша', url: `/profile/${currentUserId}` },
    { title: 'сокамерники', url: '/friends' },
    { title: 'шептунка', url: '/dialog' },
    { title: 'приколюхи', url: '/prikol' },
    { title: 'смена погоняла', url: '/settings' }
  ];

  return (
    <div className={styles.nav} >
      {
        navigationList.map(element => (
          <Link key={element.url} to={element.url}> <p>{element.title}</p> </Link>
        ))
      }
    </div >
  )
}

export default Navigator;
