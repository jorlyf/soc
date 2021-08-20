import React from 'react';
import axios from 'axios';
import { refreshPage } from '../../utilities/refreshPage';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import styles from './Auth.module.scss';

function Login() {
  const AUTHORIZE_STATUS = useSelector(state => state.auth.AUTHORIZE_STATUS)
  const dispatch = useDispatch();
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
    try {
      const res = await axios.post('/api/auth/login', { data: data });
      if (res.data.status === 200) {
        localStorage.setItem('ACCESS_TOKEN', res.data.token);
        history.push('/');
        refreshPage();
      } else {
        dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'чет не вышло впарашиться тебе' } });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'чет ошибку выдало на серваке' } });
    }
  }
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className={styles.main}>
      {AUTHORIZE_STATUS && <Redirect to='/' />}
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
