import React from 'react';
import { Switch, Route } from 'react-router-dom';

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

import { UserContext } from './contexts';
import { AppContext } from './contexts';

function App() {

  const tok = localStorage.getItem('token');
  const cui = localStorage.getItem('userId');

  function checkIsLogged() {
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  const [token, setToken] = React.useState(tok);
  const [currentUserId, setCurrentUserId] = React.useState(cui);
  const [isLogged, setIsLogged] = React.useState(checkIsLogged);

  const [notificationIsCalled, setNotificationIsCalled] = React.useState(false);
  const [msgNotification, setMsgNotification] = React.useState('');

  const [urlContentViewer, setUrlContentViewer] = React.useState('');

  return (
    <>
      <AppContext.Provider value={{ setUrlContentViewer }} >
        <UserContext.Provider value={{ token, isLogged, currentUserId, setNotificationIsCalled, setMsgNotification }}>
          <Header />
          {notificationIsCalled && <Notification msg={msgNotification} close={setNotificationIsCalled} />}
          {currentUserId}

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
        </UserContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
