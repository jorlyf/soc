import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { prepareFormData } from '../../ModalWindows/FileLoader/prepareFormData';
import { isEmpty } from '../../utilities/checks';

import { Images } from './images';
import { InputField } from '../InputField';
import { LoadedFiles } from '../../ModalWindows/FileLoader/LoadedFiles';
import { SimpleButton, AttachButton, LikeButton, CancelButton } from '../Btns';

import styles from './Post.module.scss';

export function Posts({ userID = 0, isMyPosts = false }) {

	const dispatch = useDispatch();
	const [posts, setPosts] = React.useState([]);

	const ACCESS_TOKEN = useSelector(state => state.auth.ACCESS_TOKEN);
	const CREATE_POST_DATA = useSelector(state => state.app.CREATE_POST_DATA);

	React.useEffect(() => { // GET POSTS
		(async () => {
			try {
				const { data } = await axios.post(`/api/posts/getUserPosts/${userID}`, { token: ACCESS_TOKEN });
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
	const handleLike = (postID) => {
		const post = posts.find(post => post.id === postID);
		if (ACCESS_TOKEN) {
			try {
				const { data } = axios.post("/api/posts/setLike", { data: { postID: post.id, isLike: post.liked_by_me } });
				if (data.status === 200) {
					// setLike
				} else {
					dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'чет не ставится лайк' } });
				}
			} catch (error) {
				console.error(error);
				dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'парашыч умирает' } });
			}
		}
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
		try {
			const { data } = await axios.post('/api/posts/createPost', formData);
			if (data.status === 200) {
				const newpost = { id: data.id, text: CREATE_POST_DATA.text, images: data.images, likes_count: 0 };
				const newposts = [...posts];
				newposts.unshift(newpost);

				setPosts(newposts);
				dispatch({ type: "CLEAR_CREATE_POST_DATA" });
			}
		} catch (error) {
			console.error(error);
			dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'парашыч умирает' } });
		}
	}
	const deletePost = async (postID) => {
		try {
			const { data } = await axios.post(`/api/posts/deleteMyPost/${postID}`, { token: ACCESS_TOKEN });
			if (data.status === 200) {
				setPosts([...posts.filter(post => !(post.id === postID))]);
			} else {
				dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'чет не удаляется' } });
			}
		} catch (error) {
			console.error(error);
			dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'парашыч умирает' } });
		}
	}
	const handleDeletePost = (postID) => {
		dispatch({ type: 'SET_CONFIRM_WINDOW_DATA', payload: { isVisible: true, text: "точно хош удалить пост?", onTrue: () => deletePost(postID) } });
	}


	return (
		<div className={styles.content}>
			{isMyPosts &&
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
			}

			{posts.map(post => (
				<div className={styles.post} key={post.id}>
					<div className={styles.delete}>
						{isMyPosts && <CancelButton onClick={() => handleDeletePost(post.id)} />}
					</div>

					<div className={styles.text}>
						{post.text}
					</div>
					{!isEmpty(post.images) && <Images imgArray={post.images} />}

					<div className={styles.info}>
						<div className={styles.like}>
							<LikeButton condition={true} handleClick={() => handleLike(post.id)} />
							<span>{post.likes_count}</span>
						</div>
					</div>
					<div className={styles.comments}>типа комментарии</div>
				</div>

			))}
		</div>
	)
}