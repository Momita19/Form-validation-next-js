import React from 'react';
import Styles from './checkbox.module.css'
const Checkbox = ({ name, label, checked, onChange }) => {
  return (
    <div className={Styles.element}>
    <label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
    </div>
  );
};

export default Checkbox;
