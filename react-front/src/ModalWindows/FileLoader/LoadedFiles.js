import { useDispatch } from 'react-redux';
import { CancelButton } from '../../components/Btns';

import styles from './FileLoader.module.scss';

export function LoadedFiles({ dispatchType = '', files = [] }) {

  const dispatch = useDispatch();

  const getFilename = (filename) => {
    if (filename.length > 25) {
      return `${filename.slice(0, 25)}...`;
    } else {
      return filename
    }
  }
  const handleRemoveFile = (index) => {
    files.splice(index, 1);
    if (dispatchType)
      dispatch({ type: dispatchType, payload: files });
  }
  return (
    <div className={styles.uploadedFilesInfo}>
      {files.map((file, index) => (
        <div key={index} className={styles.oneUploadedFileInfo}>
          <span>{getFilename(file.name)}</span>
          <CancelButton onClick={() => handleRemoveFile(index)} />
        </div>
      ))}
    </div>
  )
}