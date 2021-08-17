import React from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styles from './FileLoader.module.scss';

import { ExitButton } from '../../components/Btns';
import { LoadedFiles } from './LoadedFiles';

export default function FileLoader({ data }) {

	const dispatch = useDispatch();
	const inputFile = React.useRef(null);

	const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);

	React.useEffect(() => {
		document.addEventListener('click', (e) => handleOutsideClick(e));
	}, [])

	function checkFilesSize(files) {
		for (const file of files) {
			if (file.size >= data.maxFilesize)
				return false;
		}
		return true;
	}

	async function sendFiles(files) {
		const formData = new FormData();
		for (const file of files) {
			formData.append('files', file);
		};
		formData.set('token', ACCESS_TOKEN);
		const res = await axios.post(data.apiUrl, formData);
		if (res.data.status === 200) {
			//dispatch({ type: 'SET_CURRENT_OPENED_PROFILE_DATA_AVATAR_URL', payload: res.data.avatarUrl });
			handleClose();
		} else {
			// set error notification
		}
	}

	const handleSubmit = () => {
		const files = data.files;
		if (!files) {
			alert('файл выбери'); // set notification
		} else if (files.length > data.maxFilesCount) {
			alert('не более XX файлов');
		} else if (!checkFilesSize(files)) {
			alert('файл большой какой-то');
		} else {
			sendFiles(files);
		}
	}

	const handleChangeInputFiles = (e) => {
		dispatch({ type: 'SET_FILE_LOADER_DATA_FILES', payload: e.target.files });
	}

	const handleClick = () => {
		inputFile.current.click();
	}

	const overlay = React.createRef(null);

	const handleOutsideClick = (e) => {
		if (e.target === overlay.current) {
			handleClose();
		}
	}

	const handleClose = () => {
		dispatch({ type: 'SET_FILE_LOADER_DATA', payload: {} });
	}

	function getAcceptTypesFile() {
		if (data.filetype === 'image') {
			return '.png, .jpg, .jpeg'
		}
	}

	return (
		<div ref={overlay} className={styles.main}>
			<div className={styles.uploader}>

				<img className={styles.loadImage} onClick={handleClick} src='/load.png' />
				<ExitButton closeFunction={handleClose} />
				<input
					onChange={handleChangeInputFiles}
					ref={inputFile}
					type='file'
					accept={getAcceptTypesFile()}
					multiple={data.isMultiple}
				/>
				<button className={styles.submitButton} onClick={handleSubmit}>грузи</button>
				<LoadedFiles files={data.files} />

			</div>
		</div>
	)
}
