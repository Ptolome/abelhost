'use client';

import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  fullScreen = false,
  message = 'Loading...',
}) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px',
  };

  const spinner = (
    <div className={styles.loadingSpinner}>
      <div 
        className={styles.spinner}
        style={{ width: sizeMap[size], height: sizeMap[size] }}
      >
        <div className={styles.spinnerCircle}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreenOverlay}>
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;