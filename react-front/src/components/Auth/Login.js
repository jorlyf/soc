import React from 'react';
import axios from 'axios';
import Cookie from '../../cookie';

import styles from './Auth.module.scss';
import { Link, useHistory } from 'react-router-dom';

function Login() {

  const cookie = new Cookie();
  const history = useHistory();

  const onChangeLogin = (e) => {
    setLogin(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const prepareData = () => {
    return { 'login': login, 'password': password }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = prepareData();
    const res = await axios.post('/auth/login', { 'data': data });
    if (res.data.status === 'ok') {
      cookie.set({"name": "token", "value": res.data.token});
      history.push('/')
    } else {
      console.log("все плоха");
      alert('чет не вышло')
    }
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
