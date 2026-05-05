import React from 'react';
import styles from './Button.module.css';

const Button = ({ className = '', variant = 'primary', size = 'md', children, ...props }) => {
  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],
    className
  ].join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
