import './main.css';
import styles from './App.module.scss';

import Header from './components/Header';
import Content from './components/Content';
import Navigator from './components/Navigator';

function App() {
  return (
    <>
      <Header />
      <div className={styles.contentBlock} >
        <Navigator />
        <Content />
      </div>
    </>
  );
}

export default App;
