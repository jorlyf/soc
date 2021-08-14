import React from 'react';

import axios from 'axios';

import TextareaAutosize from 'react-textarea-autosize';
import { SubmitButton, AttachButton } from '../Btns';
import styles from './Post.module.scss';

export function Posts({ posts }) {

	const [text, setText] = React.useState();
	const [files, setFiles] = React.useState([]);

	const handleChangeText = (e) => {
		setText(e.target.value);
	}

	const handleAttachFiles = () => {
		setFiles();
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
		const data = {files: files, text: text};
	}

	const sendPostData = async (data) => {
		const res = await axios.post('/api/posts/createPost', { data: data });
	}

	return (
		<div className={styles.content}>
			<div className={styles.createPost}>
				<TextareaAutosize className={styles.input} onChange={handleChangeText} value={text} placeholder='вводи че нить' />
				<form className={styles.buttons} onSubmit={handleSubmit}>
					<AttachButton onClick={handleAttachFiles}/>
					<SubmitButton value='заебенить' />
				</form>
			</div>
			{posts.map(e => (
				<div className={styles.post}>

				</div>
			))}
		</div>
	)
}