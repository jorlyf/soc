import React from 'react';
import { UserContext } from '../../contexts';
import axios from 'axios';
import styles from './Friends.module.scss';
import { Redirect } from 'react-router-dom';

function Friends() {
    const [friends, setFriends] = React.useState([]);
    const { currentUserId, isLogged } = React.useContext(UserContext);

    React.useEffect(() => {
        async function fetch() {
            const res = await axios.get(`/getFriends/${currentUserId}`);
            setFriends(res.data.profiles);
        }
        if (isLogged) {
            fetch();
        }
    }, [])

    if (!isLogged) {
        return (<Redirect to='/login' />)
    }

    return (
        <div className='content'>
            <div className={styles.friendMainBlock}>
                {friends.length > 0 ?
                    friends.map((e) => (
                        <div>
                            <p key={e.login}>{e.login}</p>
                        </div>
                    )) :
                    <p className={styles.notFriends}>че петух друзей нет?</p>}
            </div>
        </div>
    )
}

export default Friends;
