import axios from 'axios';
import React from 'react';
import UserContext from '../../UserContext';

function News() {

  const { token } = React.useContext(UserContext);

  const add = () => {
    axios.post('/friend', {"id": 1, "token": token});
  }

  return (
    <div className='content'>
      <button onClick={add}>
        добавить в др
      </button>
    </div>
  )
}

export default News;
