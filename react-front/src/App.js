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

import UserContext from './UserContext';
import axios from 'axios';
import { refreshPage } from './scripts';

function App() {

  const tok = localStorage.getItem('token');
  const cui = localStorage.getItem('userId')

  const [token, setToken] = React.useState(tok);
  const [isLogged, setIsLogged] = React.useState(false);
  const [currentUserId, setUserId] = React.useState(cui);

  async function checkToken(token) {
    const res = await axios.post('/auth/checkMyToken', { 'data': token });
    if (res.data.status === 200) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      alert('токен чет умер, перезайди');
      refreshPage();
    }
  };

  React.useEffect(() => {
    if (token) {
      checkToken(token);
    }
  }, []);



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
            <Route path='/friends'>
              <Navigator />
              <Friends />
            </Route>

          </Switch>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
