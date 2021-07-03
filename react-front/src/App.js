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


function App() {

  return (
    <>
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
    </>
  );
}

export default App;
