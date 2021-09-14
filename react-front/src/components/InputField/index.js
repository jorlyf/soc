import React from 'react';
import { useDispatch } from 'react-redux';
import { trimString } from '../../utilities/checks';

import TextareaAutosize from 'react-textarea-autosize';
import styles from './InputField.module.scss';

export function InputField({ value = "", handleSubmit, dispatchFunction, placeholder, oneRow = false, maxValueLength = 512, minRows = 1 }) {

  const dispatch = useDispatch();

  const handlePress = (e) => {
    if (oneRow && e.key == 'Enter') {
      e.preventDefault();
    }
  }
  const handleChange = (e) => {
    dispatchFunction(e.target.value);
  }
  const handleUnfocused = () => {
    const newValue = trimString(value);
    if (newValue.length > maxValueLength) {
      dispatch({ type: 'SET_NEW_NOTIFICATION_DATA', payload: { message: 'слишком много написал давай меньше' } });
    } else if (handleSubmit)
      handleSubmit();
  }

  return (
    <TextareaAutosize
      onKeyDown={handlePress}
      className={styles.input}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleUnfocused}

      minRows={minRows}
    />
  )
}