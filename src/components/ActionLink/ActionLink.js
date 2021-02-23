import React from 'react';
import styles from './ActionLink.module.scss';

const ActionLink = ({ label, ...props }) => (
  <button type="button" className={styles.actionLink} {...props}>{label}</button>
);

export default ActionLink;
