import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { ExitBtn } from '../Btns';
import styles from './InputField.module.scss';

export default function InputField({ closeFunction, msg, apiUrl, previousValue, setNewProfileStatus }) {

    const overlay = React.useRef(null);
    const [serverAnswer, setServerAnswer] = React.useState('');

    const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);

    React.useEffect(() => {
        document.addEventListener('click', (e) => handleOutsideClick(e));
    }, [])

    const handleOutsideClick = (e) => {
        if (e.target === overlay.current) {
            closeFunction(false);
        }
    }

    const [text, setText] = React.useState(previousValue);

    const handleChangeText = (e) => {
        setText(e.target.value);
    }

    function checkStatusBeforeSend() {
        return text.length < 255;
    }

    const handleSendStatus = async () => {
        const cText = text;
        if (checkStatusBeforeSend()) {
            const res = await axios.post(apiUrl, { 'data': cText, 'token': ACCESS_TOKEN });
            if (res.data.status === 200) {
                setNewProfileStatus(cText);
                setServerAnswer('палучилас');
                setTimeout(() => {
                    closeFunction();
                }, 2000);
            } else {
                setServerAnswer('не палучилас пачемуто');
                setTimeout(() => {
                    closeFunction();
                }, 2000);
            }
        } else {
            setServerAnswer('сказал же 255 букв');
            setTimeout(() => {
                closeFunction();
            }, 2000);
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
                        <textarea onChange={handleChangeText} value={text} placeholder='не больше 255 буков'></textarea>
                        <button onClick={handleSendStatus}>пойдет</button>
                    </>}
            </div>
        </div>
    )
}
