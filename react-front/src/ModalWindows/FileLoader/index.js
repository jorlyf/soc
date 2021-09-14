import React from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FileLoader.module.scss';

import { ExitButton } from '../../components/Btns';
import { LoadedFiles } from './LoadedFiles';
import { prepareFormData } from "./prepareFormData";

export default function FileLoader({ data }) {

	const dispatch = useDispatch();
	const inputFile = React.useRef(null);

	const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);

	React.useEffect(() => {
		document.addEventListener('click', (e) => handleOutsideClick(e));
	}, [])

	const checkFilesSize = (files) => {
		for (const file of files) {
			if (file.size >= data.maxFilesize)
				return false;
		}
		return true;
	}

	const sendFiles = async (files) => {
		const before = { files: files };
		const formData = prepareFormData(before, ACCESS_TOKEN);
		try {
			const res = await axios.post(data.apiUrl, formData);
			if (res.data.status === 200) {
				switch (true) {
					case data.apiUrl === '/api/profile/uploadAvatar':
						dispatch({ type: 'SET_CURRENT_OPENED_PROFILE_DATA_AVATAR_URL', payload: res.data.avatarUrl });
						break;
				}
			} else {
				dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'не отправилось оно не знаю че такое' } });
			}
			handleClose();
		} catch (error) {
			console.error(error);
			dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'ошибка сервека' } });
		}
	}

	const handleSubmit = () => {
		const files = data.files;
		if (files.length === 0) {
			dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'файл то выбери' } });
		} else if (files.length > data.maxFilesCount) {
			dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: `незя больше ${data.maxFilesCount} файлов сюда грузить` } });
		} else if (!checkFilesSize(files)) {
			dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'какойт из файлов слишком большой' } });
		} else {
			sendFiles(files);
		}
	}

	const handleChangeInputFiles = (e) => {
		if (!data.isMultiple) {
			dispatch({ type: 'SET_FILE_LOADER_DATA_FILES', payload: [...e.target.files] });
		} else {
			dispatch({ type: 'SET_FILE_LOADER_DATA_FILES', payload: [...data.files, ...e.target.files] });
		}
	}

	const handleClick = () => {
		inputFile.current.click();
	}

	const overlay = React.createRef(null);

	const handleOutsideClick = (e) => {
		if (e.target === overlay.current)
			handleClose();
	}

	const handleClose = () => {
		dispatch({ type: 'SET_FILE_LOADER_DATA', payload: {} });
	}

	const getAcceptedFileTypes = () => {
		switch (data.filetype) {
			case ('image'):
				return '.png, .jpg, .jpeg'
		}
	}

	return (
		<div ref={overlay} className={styles.main}>
			<div className={styles.uploader}>
				<ExitButton closeFunction={handleClose} />
				<span className={styles.message}>{data.message}</span>
				<img className={styles.loadImage} onClick={handleClick} src='/load.png' />
				<input
					onChange={handleChangeInputFiles}
					type='file'
					accept={getAcceptedFileTypes()}
					multiple={data.isMultiple}
					ref={inputFile}
				/>
				<button className={styles.submitButton} onClick={handleSubmit}>грузи</button>
				<LoadedFiles
					dispatchType='SET_FILE_LOADER_DATA_FILES'
					files={data.files}
				/>

			</div>
		</div>
	)
}
