import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import styles from './Navigator.module.scss';

function Navigator() {
  const USER_ID = useSelector(state => state.auth.USER_ID);

  const navigationList = [
    { title: 'стенгазета', url: '/' },
    { title: 'моя параша', url: `/profile/${USER_ID}` },
    { title: 'сокамерники', url: `/friends/${USER_ID}` },
    { title: 'шептунка', url: '/messages' },
    { title: 'приколюхи', url: '/prikol' },
    { title: 'смена погоняла', url: '/settings' }
  ];

  return (
    <div className={styles.nav} >
      {
        navigationList.map(element => (
          <Link key={element.title} to={element.url}> <p>{element.title}</p> </Link>
        ))
      }
    </div >
  )
}

export default Navigator;
