import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { prepareFormData } from '../../ModalWindows/FileLoader/prepareFormData';

import { Images } from './images';
import { InputField } from '../InputField';
import { LoadedFiles } from '../../ModalWindows/FileLoader/LoadedFiles';
import { SimpleButton, AttachButton, LikeButton } from '../Btns';

import styles from './Post.module.scss';

export function Posts() {

	const dispatch = useDispatch();
	const [posts, setPosts] = React.useState([]);

	const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
	const CREATE_POST_DATA = useSelector(state => state.app.CREATE_POST_DATA);

	React.useEffect(() => { // GET POSTS
		(async () => {
			try {
				const { data } = await axios.get('/api/posts/getUserPosts');
				console.log(data);
				if (data.status === 200)
					setPosts(data.posts);
			} catch (error) {
				console.log(error);
				dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'чет сломалось' } });
			}
		})();
	}, []);

	const handleChangeText = (text) => {
		dispatch({ type: 'SET_CREATE_POST_TEXT', payload: text });
	}
	const handleAttachFiles = (e) => {
		dispatch({ type: 'SET_CREATE_POST_FILES', payload: [...CREATE_POST_DATA.files, ...e.target.files] });
	}
	const handleLike = (id) => {
		const postID = posts.filter(post => post.id === id).id;
		// set like
	}
	const checkLimits = (post) => {
		if (post.text.length > 16384 || (post.text.length < 1 && post.files.length < 1))
			return false;
		if (post.files.length > 8)
			return false;

		return true;
	}
	const handleSubmit = () => {
		const before = { files: CREATE_POST_DATA.files, text: CREATE_POST_DATA.text };
		if (checkLimits(before)) {
			const formData = prepareFormData(before, ACCESS_TOKEN);
			sendPostData(formData);
		}
	}
	const sendPostData = async (formData) => {
		const { data } = await axios.post('/api/posts/createPost', formData);
		if (data.status === 200) {
			const newpost = { text: CREATE_POST_DATA.text, image_urls: CREATE_POST_DATA.image_urls, likes_count: 0 };
			const newposts = [...posts];
			newposts.unshift(newpost);

			setPosts(newposts);
			dispatch({ type: "CLEAR_CREATE_POST_DATA" });
		}
	}


	return (
		<div className={styles.content}>
			<div className={styles.createPost}>
				<div className={styles.input}>
					<InputField
						value={CREATE_POST_DATA.text}
						dispatchFunction={handleChangeText}
						placeholder="текст поста"
						maxValueLength={8192}

						minRows={4}
					/>
				</div>
				<div className={styles.buttons} >
					<AttachButton
						onChange={handleAttachFiles}
						filetype='image'
					/>
					<SimpleButton onClick={handleSubmit} value='заебенить' />
				</div>
				<LoadedFiles
					dispatchType='SET_CREATE_POST_FILES'
					files={CREATE_POST_DATA.files}
				/>
			</div>

			{posts.map(post => (
				<div className={styles.post} key={post.id}>
					
					<div className={styles.text}>
						{post.text}
					</div>
					<Images imgArray={post.image_urls} />

					<div className={styles.info}>
						<div className={styles.like}>
							<LikeButton condition={true} handleClick={handleLike} />
							<span>12</span>
						</div>
					</div>
					<div className={styles.comments}>типа комментарии</div>
				</div>
				
			))}
		</div>
	)
}