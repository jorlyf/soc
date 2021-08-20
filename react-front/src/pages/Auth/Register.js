import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';

import styles from './Auth.module.scss';

function Register() {
  const AUTHORIZE_STATUS = useSelector((state) => state.auth.AUTHORIZE_STATUS);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeLoginInput = (e) => {
    setLoginInput(e.target.value);
  }
  const onChangePasswordInput = (e) => {
    setPasswordInput(e.target.value);
  }
  const onChangeQuestionInput = (e) => {
    setQuestionInput(e.target.value);
  }
  const prepareData = () => {
    return { 'login': loginInput, 'password': passwordInput };
  }
  const checkQuestionAnswer = () => {
    if (questionInput.toLocaleLowerCase() !== questionAnswer.toLocaleLowerCase()) {
      return false;
    } else { return true; }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questionInput === '') {
      dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'ты сначала на вопрос ответь епта' } });
    } else if (!checkQuestionAnswer()) {
      dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'непрально решил' } });
    } else {
      const data = prepareData();
      try {
        const res = await axios.post('/api/auth/register', { data: data });
        if (res.data.status === 200) {
          history.push('/login');
        } else {
          dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'чет не вышло впарашиться тебе' } });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'чет ошибку выдало на серваке' } });
      }
    }
  };
  const [loginInput, setLoginInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [questionInput, setQuestionInput] = React.useState('');
  const [questions, setQuestions] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [questionAnswer, setQuestionAnswer] = React.useState('');

  async function getQuestions() {
    const res = await axios.get('/api/auth/getQuestions');
    setQuestions(res.data);
  }
  function changeQuestion() {
    if (questions) {
      let qu = questions[Math.floor(Math.random() * questions.length)];
      while (qu.question === question) {
        qu = questions[Math.floor(Math.random() * questions.length)];
      }
      setQuestion(qu.question);
      setQuestionAnswer(qu.answer);
    }
  }

  React.useEffect(() => {
    if (!questions) {
      getQuestions();
    }
  }, []);

  React.useEffect(() => {
    changeQuestion();
  }, [questions]);

  return (
    <div className={styles.main}>
      {AUTHORIZE_STATUS && <Redirect to='/' />}
      <Link to='login'>
        <button className={styles.btnChangeHref}>я тут уже давно</button>
      </Link>
      <form onSubmit={handleSubmit} >
        <h2>сначала докажи что не петух перед первым входом в хату</h2>
        <input id='login' value={loginInput} onChange={onChangeLoginInput}
          type='text' placeholder='погоняло' autoComplete='current-username'></input>
        <input id='password' value={passwordInput} onChange={onChangePasswordInput}
          type='password' placeholder='код' autoComplete='current-password'></input>
        <button type='submit'>войти в хату</button>
      </form>
      <div className={styles.question}>
        <button onClick={changeQuestion}>дава другой вопрос</button>
        <p>реши задачу</p>
        <span>{question}</span>
        <input id='question' value={questionInput} onChange={onChangeQuestionInput}
          type='text' placeholder='сюда ответ'></input>
      </div>
    </div>
  )
}

export default Register;
