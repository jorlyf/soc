import styles from './ContentViewer.module.scss';
import { useDispatch } from 'react-redux';
import { Logic } from './logic';

import { ExitButton } from '../../components/Btns';

function ContentViewer({ data }) {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({ type: 'SET_CONTENT_VIEWER_DATA', payload: {} });
    }
    const getContent = () => {
        return new Logic(data);
    }

    return (
        <div className={styles.main}>
            {getContent()}
            <ExitButton closeFunction={handleClose} />
        </div>
    )
}

export default ContentViewer;
