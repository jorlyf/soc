import React from 'react';
import axios from 'axios';
import styles from './Friends.module.scss';
import { Redirect, useParams } from 'react-router-dom';
import { SimpleButton } from '../../components/Btns/index';
import { useSelector } from 'react-redux';

function Friends() {
  const { id } = useParams();

  const [acceptedFriends, setAcceptedFriends] = React.useState([]);
  const [wasFetched, setWasFetched] = React.useState(false);
  const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
  const USER_ID = useSelector(state => state.auth.USER_ID);

  React.useEffect(() => {
    if (id) {
      (async () => {
        const res = await axios.post(`/api/profile/getFriends/${id}`, { token: ACCESS_TOKEN });
        setWasFetched(true);
        if (res.data.status === 200) {
          setAcceptedFriends(res.data.acceptedFriends);
        }
      })();
    };
  }, [id])

  function getAvatar(avatar_url) {
    if (avatar_url) {
      return <img className={styles.avatar} key={avatar_url} src={`/profileAvatars/${avatar_url}`} />
    } else {
      return <img className={styles.avatar} src={'/profileAvatars/default.jpg'} />
    }
  }

  return (
    <div className='content'>
      {wasFetched &&
        <div className={styles.friendMainBlock}>
          {acceptedFriends.length > 0 ?
            acceptedFriends.map((e, index) => (
              <div className={styles.oneFriend} key={index} >
                <div className={styles.avatarInfo}>
                  {getAvatar(e.avatar_url)}
                </div>
                <div className={styles.info}>
                  <p className={styles.login} key={e.login}><a href={`/profile/${e.id}`}>{e.login}</a></p>
                  <div className={styles.friendButtons} >
                    <SimpleButton onClick={''} value='шептануть' />
                    <SimpleButton onClick={''} value='больш не кореш' />
                  </div>
                </div>

              </div>
            )) :
            USER_ID === +id ?
              <p className={styles.notFriends}>че петух братанов нет?</p>
              :
              <p className={styles.notFriends}>у этого петуха нет братанов</p>
          }
        </div>}
    </div>
  )
}

export default Friends;
