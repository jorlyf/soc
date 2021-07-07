import React from 'react';

import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';
import styles from './Navigator.module.scss';

function Navigator() {
  let { currentUserId } = React.useContext(UserContext);

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
