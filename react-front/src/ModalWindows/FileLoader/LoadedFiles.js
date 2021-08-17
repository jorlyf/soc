import { CancelButton } from '../../components/Btns';

import styles from './FileLoader.module.scss';

export function LoadedFiles({ files = [] }) {

  function getFilename(filename) {
    if (filename.length > 25) {
      return `${filename.slice(0, 25)}...`;
    } else {
      return filename
    }
  }

  return (
    <div>
      {[...files].map(file => (
        <div key={file.name} className={styles.oneUploadedFileInfo}>
          <span>{getFilename(file.name)}</span>
          <CancelButton closeFunction={''} />
        </div>
      ))}
    </div>
  )
}