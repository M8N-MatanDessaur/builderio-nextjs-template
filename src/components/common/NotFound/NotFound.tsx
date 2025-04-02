'use client';

import React from 'react';
import styles from './NotFound.module.css';
import { NotFoundProps, defaultNotFoundProps } from './NotFound.setup';

/**
 * NotFound Component
 * 
 * A reusable component for displaying "page not found" errors
 * 
 * @param {NotFoundProps} props - Component properties
 * @returns {React.ReactElement} - Rendered component
 */
const NotFound: React.FC<NotFoundProps> = (props) => {
  // Merge default props with provided props
  const {
    title = defaultNotFoundProps.title,
    message = defaultNotFoundProps.message,
    showHomeLink = defaultNotFoundProps.showHomeLink
  } = props;

  return (
    <div className={styles.container} role="alert">
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.message}>{message}</p>
        
        {showHomeLink && (
          <a href="/" className={styles.link}>
            Return to home
          </a>
        )}
      </div>
    </div>
  );
};

export default NotFound;
