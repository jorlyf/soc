import React from 'react';
import axios from 'axios';

import styles from './Auth.module.scss';
import { Link } from 'react-router-dom';

function Login() {

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const prepareData = () => {
    return { 'login': login, 'password': password }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = prepareData();
    axios.post('/login', { 'data': data })
  }
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className={styles.main}>
      <Link to='register'>
        <button className={styles.btnChangeHref}>я тут впервые</button>
      </Link>
      <form onSubmit={handleSubmit} >
        <h2>докажи что тут местный</h2>
        <input id='login' value={login} onChange={onChangeLogin}
          type='text' placeholder='погоняло' autoComplete='current-username'></input>
        <input id='password' value={password} onChange={onChangePassword}
          type='password' placeholder='код' autoComplete='current-password'></input>
        <button type='submit'>войти в хату</button>
      </form>
    </div>
  )
}

export default Login;
