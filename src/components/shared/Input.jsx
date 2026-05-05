import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.error : ''} ${className}`}
        {...props}
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
