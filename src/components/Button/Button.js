import React from 'react';
import Clickable from 'components/Clickable';
import './Button.scss';

/**
 * The corporate button.
 *
 * @param {String}  label
 * @param {String}  theme: default (secondary), login, primary
 * @param {String}  className
 * @param {Boolean} disabled
 * @param           props: the rest of the props passed to the <button>
 */
const Button = ({ label, theme = 'default', className = '', disabled = false, ...props }) => (
  <Clickable disabled={disabled} className={`brand-button ${theme} ${className}`} {...props}>
    <div>{label}</div>
  </Clickable>
);

export default Button;
