import React from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './FileLoader.module.scss';

import { ExitBtn } from '../Btns';

export default function FileLoader({ closeFunction, apiUrl, maxFileSize, setAvatarUrl }) {

    const [msg, setMsg] = React.useState('');
    const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
    const inputFile = React.useRef(null);

    React.useEffect(() => {
        document.addEventListener('click', (e) => handleOutsideClick(e));
    }, [])

    function checkFileSize(fileSize) {
        return fileSize <= maxFileSize;
    }

    async function sendFile(file) {
        const formData = new FormData();
        formData.set('file', file);
        formData.set('token', ACCESS_TOKEN);
        const res = await axios.post(apiUrl, formData);
        if (res.data.status === 200) {
            setMsg('палучилас');
            setAvatarUrl(res.data.avatarUrl);
            setTimeout(() => {
                closeFunction();
            }, 2000);
        } else {
            setMsg('не палучилас');
            setTimeout(() => {
                closeFunction();
            }, 2000);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
        if (!file) {
            alert('файл выбери')
        } else if (checkFileSize(file.size)) {
            sendFile(file);
        } else {
            alert('слишком большой');
        }
    }

    const handleClick = () => {
        inputFile.current.click();
    }

    const overlay = React.createRef(null);

    const handleOutsideClick = (e) => {
        if (e.target === overlay.current) {
            closeFunction(false);
        }
    }

    return (
        <div ref={overlay} className={styles.main}>
            <div>
                {msg
                    ?
                    <span>{msg}</span>
                    :
                    <>
                        <form onSubmit={handleSubmit}>
                            <img onClick={handleClick} src='/load.png' />
                            <ExitBtn closeFunction={() => closeFunction(false)} />
                            <input
                                type='file'
                                ref={inputFile}
                                accept=".png, .jpg, .jpeg"
                            />
                            <button type='submit'>грузи</button>
                        </form>
                    </>
                }
            </div>
        </div>
    )
}
