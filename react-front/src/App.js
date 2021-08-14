import React from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import './main.css';
import styles from './App.module.scss';

import Header from './components/Header';
import News from './components/News';
import Navigator from './components/Navigator';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile';
import Friends from './components/Friends';
import Notification from './components/Notification';
import ContentViewer from './components/ContentViewer';

import { AppContext } from './contexts';

function App() {

  const tokenFromLS = localStorage.getItem('accesToken');

  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      if (tokenFromLS) {
        const res = await axios.post('/api/auth/checkMyToken', { 'token': tokenFromLS });
        if (res.data.status === 200) {
          dispatch({ type: 'SET_USER_ID', payload: res.data.payload.id });
          dispatch({ type: 'SET_ACCESS_TOKEN', payload: tokenFromLS });
          dispatch({ type: 'SET_AUTHORIZE_STATUS', payload: true });
        }
      }
    })();
  }, [])

  const [notificationIsCalled, setNotificationIsCalled] = React.useState(false);
  const [msgNotification, setMsgNotification] = React.useState('');

  const [urlContentViewer, setUrlContentViewer] = React.useState('');

  const USER_ID = useSelector(state => state.auth.USER_ID);

  return (
    <>

      <AppContext.Provider value={{ setUrlContentViewer }} >
        <Header />
        {notificationIsCalled && <Notification msg={msgNotification} close={setNotificationIsCalled} />}

        {urlContentViewer && <ContentViewer url={urlContentViewer} setUrl={setUrlContentViewer} />}

        <div className={styles.contentBlock} >
          <Switch>

            <Route path='/' exact>
              <Navigator />
              <News />
            </Route>
            <Route path='/profile/:id' exact>
              <Navigator />
              <Profile />
            </Route>
            <Route path='/register' exact>
              <Register />
            </Route>
            <Route path='/login' exact>
              <Login />
            </Route>
            <Route path='/friends/:id' exact>
              <Navigator />
              <Friends />
            </Route>

          </Switch>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
