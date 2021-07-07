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
import UserContext from './UserContext';
import Cookie from './Cookie';
import axios from 'axios';
import { refreshPage } from './scripts';

function App() {
  const cookie = new Cookie();
  const tok = cookie.getToken();
  const cui = cookie.getUserId();

  const [token, setToken] = React.useState(tok);
  const [isLogged, setIsLogged] = React.useState(false);
  const [currentUserId, setUserId] = React.useState(cui);

  React.useEffect(() => {
    async function check() {
      const res = await axios.post('/auth/checkMyToken', { 'data': token });
      if (res.data.status === 200) {
        setIsLogged(true);
        setUserId(cookie.getUserId());
      } else {
        setIsLogged(false);
        cookie.removeAll();
        alert('токен чет умер, перезайди');
        refreshPage();
      }
    };
    if (token) {
      check();
    }
  }, [token]);



  return (
    <>
      <UserContext.Provider value={{ token, isLogged, currentUserId }}>
        <Header />
        {currentUserId}
        <div className={styles.contentBlock} >
          <Switch>

            <Route path='/' exact>
              <Navigator />
              <News />
            </Route>
            <Route path='/profile/:id' >
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
