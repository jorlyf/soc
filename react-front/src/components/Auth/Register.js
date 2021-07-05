import React from 'react';
import axios from 'axios';

import styles from './Auth.module.scss';
import { Link } from 'react-router-dom';

function Register() {

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
      alert('ты сначала реши вопрос епта')
    } else if (!checkQuestionAnswer()) {
      alert('непрально решил')
    } else {
      const data = prepareData();
      const res = await axios.post('/register', { 'data': data });
      console.log(res.data);
    }
  };
  const [loginInput, setLoginInput] = React.useState('');
  const [passwordInput, setPasswordInput] = React.useState('');
  const [questionInput, setQuestionInput] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [questionAnswer, setQuestionAnswer] = React.useState('')

  async function getQuestion() {
    const res = await axios.get('/getQuestion');
    setQuestionAnswer(res.data.answer);
    setQuestion(res.data.question);
  }

  React.useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div className={styles.main}>
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
        <button onClick={getQuestion}>дава другой вопрос</button>
        <p>реши задачу</p>
        <p>{question}</p>
        <input id='question' value={questionInput} onChange={onChangeQuestionInput}
          type='text' placeholder='сюда ответ'></input>
      </div>
    </div>
  )
}

export default Register;
