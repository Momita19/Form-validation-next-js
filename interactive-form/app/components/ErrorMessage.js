import React from 'react';
import Styles from './form.module.css'

const ErrorMessage = ({ message }) => {
  return <p className={Styles.errorMessage}>{message}</p>;
};

export default ErrorMessage;