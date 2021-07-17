import React from 'react';

import axios from 'axios';

import { ExitBtn } from '../Btns';
import styles from './InputField.module.scss';
import { UserContext } from '../../contexts';

export default function InputField({ closeFunction, msg, apiUrl, previousValue, setNewProfileStatus }) {

    const overlay = React.useRef(null);
    const [serverAnswer, setServerAnswer] = React.useState('');

    const { token } = React.useContext(UserContext);

    React.useEffect(() => {
        document.addEventListener('click', (e) => handleOutsideClick(e));
    }, [])

    const handleOutsideClick = (e) => {
        if (e.target === overlay.current) {
            closeFunction(false);
        }
    }

    const [text, setText] = React.useState('');

    const handleChangeText = (e) => {
        setText(e.target.value);
    }

    function checkStatusBeforeSend() {
        return text.length < 255;
    }

    const handleSendStatus = async () => {
        const cText = text;
        if (checkStatusBeforeSend()) {
            const res = await axios.post(apiUrl, { 'data': cText, 'token': token });
            if (res.data.status === 200) {
                setNewProfileStatus(cText);
                setServerAnswer('палучилас');
                setTimeout(() => {
                    closeFunction();
                }, 2000);
            } else {
                setServerAnswer('не палучилас');
                setTimeout(() => {
                    closeFunction();
                }, 2000);
            }
        } else {
            alert('сказал же 255 букв');
        }
    }

    return (
        <div ref={overlay} className={styles.main}>
            <div>
                {serverAnswer
                    ?
                    <p>{serverAnswer}</p>
                    :
                    <>
                        {msg && <span>{msg}</span>}
                        <ExitBtn closeFunction={() => closeFunction(false)} />
                        <textarea onChange={handleChangeText} value={text} placeholder='не больше 255 буков'>{previousValue}</textarea>
                        <button onClick={handleSendStatus}>пойдет</button>
                    </>}
            </div>
        </div>
    )
}
