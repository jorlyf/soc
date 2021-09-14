import { useDispatch } from 'react-redux';

import styles from './Post.module.scss';

export function Images({ imgArray = [] }) {

  const dispatch = useDispatch();

  const getUrl = (image) => {
    return `/postImages/${image}`;
  }

  const handleClick = (image) => {
    dispatch({
      type: 'SET_CONTENT_VIEWER_DATA',
      payload:
      {
        isVisible: true,
        url: getUrl(image),
        type: 'image'
      }
    });
  }

  const getClassName = () => {
    switch (imgArray.length) {
      case 0:
      case 1:
        return styles.images_1;
      default:
        return styles.images_2;
    }
  }

  return (<div className={getClassName()}>
    {imgArray.map(image => <img onClick={() => handleClick(image)} src={getUrl(image)} />)}
  </div>);
}