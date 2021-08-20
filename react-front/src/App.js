import React from 'react';
import axios from 'axios';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// css
import './main.css';
import styles from './App.module.scss';

// pages
import News from './pages/News';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Logout from './pages/Auth/Logout';
import ErrorPage from './pages/ErrorPage';

// components
import Header from './components/Header';
import Navigator from './components/Navigator';


function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const tokenFromLS = localStorage.getItem('ACCESS_TOKEN');
  const ACCESS_TOKEN_WAS_FETCHED = useSelector((state) => state.auth.ACCESS_TOKEN_WAS_FETCHED);


  React.useEffect(() => {
    (async () => { // check token from LS if have
      if (tokenFromLS) {
        try {
          const { data } = await axios.post('/api/auth/checkMyToken', { token: tokenFromLS });
          if (data.status === 200) {
            dispatch({ type: 'SET_USER_ID', payload: data.payload.id });
            dispatch({ type: 'SET_ACCESS_TOKEN', payload: tokenFromLS });
            dispatch({ type: 'SET_AUTHORIZE_STATUS', payload: true });
          } else if (data.status === 401) {
            history.push('/error/401');
            Logout();
          } else {
          }
        } catch (error) {
          console.error(error);
          history.push('/error/500');
        }
      }
      dispatch({ type: 'SET_ACCESS_TOKEN_WAS_FETCHED', payload: true });
    })();
  }, [])

  return (
    <>
      {ACCESS_TOKEN_WAS_FETCHED &&
        <>
          <Header />

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
              <Route path='/error/:errorID' exact>
                <ErrorPage />
              </Route>

            </Switch>
          </div>
        </>}
    </>
  );
}

export default App;
