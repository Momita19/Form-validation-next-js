import React from 'react';
import Styles from './form.module.css'
const FormField = ({ label, name, value, onChange, error }) => {
  return (
    <div>
      <label>
        {label}:
        <input className={Styles.input} type="text" name={name} value={value} onChange={onChange} />
      </label>
      {error && <p className={Styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default FormField;
