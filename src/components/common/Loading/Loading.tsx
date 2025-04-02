'use client';

/**
 * Loading Component
 * 
 * A reusable loading spinner component
 */

import React from 'react';
import styles from './Loading.module.css';
import { LoadingProps, defaultLoadingProps } from './Loading.setup';

const Loading: React.FC<LoadingProps> = (props) => {
  // Merge default props with provided props
  const {
    height = defaultLoadingProps.height,
    width = defaultLoadingProps.width,
    spinnerSize = defaultLoadingProps.spinnerSize,
    spinnerColor = defaultLoadingProps.spinnerColor,
    spinnerBorderWidth = defaultLoadingProps.spinnerBorderWidth,
    spinnerBorderColor = defaultLoadingProps.spinnerBorderColor
  } = props;

  return (
    <div 
      className={styles.container} 
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
      role="status"
      aria-live="polite"
    >
      <div 
        className={styles.spinner}
        style={{ 
          width: typeof spinnerSize === 'number' ? `${spinnerSize}px` : spinnerSize,
          height: typeof spinnerSize === 'number' ? `${spinnerSize}px` : spinnerSize,
          borderWidth: typeof spinnerBorderWidth === 'number' ? `${spinnerBorderWidth}px` : spinnerBorderWidth,
          borderColor: spinnerBorderColor,
          borderTopColor: spinnerColor
        }}
      />
    </div>
  );
};

export default Loading;
