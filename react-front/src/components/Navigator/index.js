import styles from './Navigator.module.scss';

function Navigator() {
  const navigationList = ['моя параша', 'стенгазета', 'сокамерники', 'шептунка', 'приколюхи ', 'смена погоняла'];

  return (
    <div className={styles.nav}>
      {navigationList.map(element => (
        <p>{element}</p>
      ))}
    </div>
  )
}

export default Navigator;
