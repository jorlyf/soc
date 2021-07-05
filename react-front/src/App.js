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
import UserContext from './userContext';
import Cookie from './cookie';
import axios from 'axios';

function App() {
  const cookie = new Cookie();
  const tok = cookie.getToken();

  const [token, setToken] = React.useState(tok);
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    async function check() {
      const res = await axios.post('/auth/checkMyToken', { 'data': token });
      if (res.data.status === 'ok') {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    }
    check();
  }, [token]);


  return (
    <>
      <UserContext.Provider value={token, isLogged}>
        <Header />
        <div className={styles.contentBlock} >
          <Switch>

            <Route path='/' exact>
              <Navigator />
              <News />
            </Route>
            <Route path='/profile' >
              <Navigator />
              <Profile />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>

          </Switch>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
