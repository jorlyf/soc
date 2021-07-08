import axios from 'axios';

function News() {

  const add = () => {
    axios.get('/friend');
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
