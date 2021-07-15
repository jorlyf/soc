import { ExitBtn } from '../Btns';
import styles from './ContentViewer.module.scss';

function ContentViewer({url, setUrl}) {

    const handleClose = () => {
        setUrl('');
    } // if have url it will render
    console.log(url);
    return (
        <div className={styles.main}>
            <img src={url} />
            <ExitBtn closeFunction={handleClose}/>
        </div>
    )
}

export default ContentViewer;
