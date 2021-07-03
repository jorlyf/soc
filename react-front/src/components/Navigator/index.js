import { Link } from 'react-router-dom';

import styles from './Navigator.module.scss';

function Navigator() {
  const navigationList = [
    { title: 'стенгазета', url: '/' },
    { title: 'моя параша', url: '/profile' },
    { title: 'сокамерники', url: '/friends' },
    { title: 'шептунка', url: '/dialog' },
    { title: 'приколюхи', url: '/prikol' },
    { title: 'смена погоняла', url: '/settings' }
  ];

  return (
    <div className={styles.nav} >
      {
        navigationList.map(element => (
          <Link to={element.url}> <p>{element.title}</p> </Link>
        ))
      }
    </div >
  )
}

export default Navigator;
