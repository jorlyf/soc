import React from "react";
import axios from 'axios';
import styles from './FileLoader.module.scss';
import { UserContext } from "../../contexts";

export default function FileLoader({ closeFunction, apiUrl, maxFileSize, setAvatarUrl }) {

    const [msg, setMsg] = React.useState('');
    const { token } = React.useContext(UserContext);
    const inputFile = React.useRef(null);

    function checkFileSize(fileSize) {
        return fileSize <= maxFileSize;
    }

    async function sendFile(file) {
        const formData = new FormData();
        formData.set('file', file);
        formData.set('token', token);
        const res = await axios.post(apiUrl, formData);
        if (res.data.status === 200) {
            setMsg('палучилас');
            setAvatarUrl(res.data.avatarUrl);
            setTimeout(() => {
                closeFunction();
                setMsg('');
            }, 2000);
        } else {
            setMsg('не палучилас');
            setTimeout(() => {
                closeFunction();
                setMsg('');
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
            alert('размер файла соу биг');
        }
        console.log(file);
    }

    const handleClick = () => {
        inputFile.current.click();
        //closeFunction(false);
    }

    const handleOutsideClick = () => {
        closeFunction(false);
    }

    return (
        <div className={styles.main}>
            <div>
                {msg
                    ?
                    <span>{msg}</span>
                    :
                    <>
                        <img onClick={handleClick} src='/load.png' />
                        <form onSubmit={handleSubmit}>
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
