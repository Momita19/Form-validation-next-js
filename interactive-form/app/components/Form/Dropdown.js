import React from 'react';
import Styles from './form.module.css'

const Dropdown = ({ label, name, options, value, onChange, error }) => {
  return (
    <div>
      <label>
        {label}:
        <select className={Styles.input} name={name} value={value} onChange={onChange}>
          <option  value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {error && <p className={Styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Dropdown;
