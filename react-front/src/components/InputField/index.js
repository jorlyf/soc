import React from 'react';
import { useDispatch } from 'react-redux';
import { trimString } from '../../utilities/checks';

import TextareaAutosize from 'react-textarea-autosize';
import styles from './InputField.module.scss';

export function InputField({ previousValue, placeholder, handleSubmit, maxValueLength = 512 }) {

  const dispatch = useDispatch();
  const [value, setValue] = React.useState(previousValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const handleUnfocused = () => {
    let newValue = trimString(value);
    setValue(newValue);
    if (previousValue !== newValue) {
      if (newValue.length < maxValueLength) {
        handleSubmit(newValue);
      } else {
        dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'слишком много написал давай меньше' } });
      }
    }
  }

  return (
    <TextareaAutosize
      className={styles.input}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleUnfocused}
    />
  )
}