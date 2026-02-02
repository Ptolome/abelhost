'use client';

import React from 'react';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  title?: string;
  severity?: 'error' | 'warning' | 'info';
  showIcon?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  title = 'Something went wrong',
  severity = 'error',
  showIcon = true,
}) => {
  const severityColors = {
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
  };

  const iconMap = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div 
      className={styles.errorContainer}
      style={{ borderLeftColor: severityColors[severity] }}
    >
      <div className={styles.header}>
        {showIcon && (
          <span className={styles.icon} role="img" aria-label={severity}>
            {iconMap[severity]}
          </span>
        )}
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <p className={styles.message}>{message}</p>
      
      <div className={styles.actions}>
        {onRetry && (
          <button
            className={styles.retryButton}
            onClick={onRetry}
            aria-label="Retry"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;