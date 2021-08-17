import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { isMyId } from '../../utilities/checks';

import OtherProfile from './OtherProfile';
import MyProfile from './MyProfile';

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const CURRENT_OPENED_PROFILE_DATA = useSelector(state => state.app.CURRENT_OPENED_PROFILE_DATA);

  const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
  const USER_ID = useSelector(state => state.auth.USER_ID);

  const [wasFetched, setWasFetched] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      (async () => {
        const res = await axios.post(`/api/profile/getProfile/${id}`, { token: ACCESS_TOKEN });
        setWasFetched(true);
        if (res.data.status === 200) {
          let data = res.data.info;
          data.isMyProfile = isMyId(USER_ID, id);
          dispatch({ type: 'SET_CURRENT_OPENED_PROFILE_DATA', payload: data });
        }
      })();
    }
  }, [id, ACCESS_TOKEN]);

  if (!USER_ID) { // 0 - unlogged    TODO: transport to Navigator comp
    history.push('/login');
  }

  return (
    <div className='content'>
      {wasFetched
        && (
          CURRENT_OPENED_PROFILE_DATA.isMyProfile
            ?
            <MyProfile />
            :
            <OtherProfile />

        )}
    </div>
  )
}

export default Profile;
