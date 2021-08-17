import styles from './Profile.module.scss';

export function ProfileFriendList({ profileId, friends }) {

    function getAvatar(avatar_url) {
        if (avatar_url) {
            return <img className={styles.avatar} key={avatar_url} src={`/profileAvatars/${avatar_url}`} />
        } else {
            return <img className={styles.avatar} src={'/profileAvatars/default.jpg'} />
        }
    }
    function getFriendCount(length) {
        if (length == 0) {
            return 'друзей нет'
        } else {
            return `${length} корешей`
        }
    }
    return (
        <ul className={styles.friendList}>
            <span><a href={`/friends/${profileId}`}>{getFriendCount(friends.length)}</a></span>
            {friends.slice(0, 6).map((friend) => (
                <li>
                    {getAvatar(friend.avatar_url)}
                    <a href={`/profile/${friend.id}`}>{friend.login}</a>
                </li>
            ))}
        </ul>
    )
}