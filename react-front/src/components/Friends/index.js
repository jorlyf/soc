import React from 'react';
import UserContext from '../../UserContext';
import axios from 'axios';

function Friends() {
    const [friends, setFriends] = React.useState([]);
    const { currentUserId } = React.useContext(UserContext);
    console.log(currentUserId);
    React.useEffect(() => {
        async function fetch() {
            const res = await axios.get(`/getFriends/${currentUserId}`);
            setFriends(res.data);
            console.log(res.data);
        }
        fetch();
    }, [])
    return (
        <div>
            {friends.map((e) => {
                <p>{e.login}</p>
            })}
        </div>
    )
}

export default Friends;
