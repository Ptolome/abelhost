'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import styles from './login.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError, user } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
  });
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);
  
  const validateForm = () => {
    const errors = { username: '', password: '' };
    let isValid = true;
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
      isValid = false;
    }
    
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 3) {
      errors.password = 'Password must be at least 3 characters';
      isValid = false;
    }
    
    setValidationErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isLoading) {
      return;
    }
    
    try {
      await login(formData);
    } catch (err) {
      console.error('Login error:', err);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (error) {
      clearError();
    }
  };
  
  if (!isMounted) {
    return null; 
  }
  
  if (user) {
    return null;
  }
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Welcome to Abelohost Shop</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
           
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`${styles.input} ${validationErrors.username ? styles.inputError : ''}`}
              placeholder="Username"
              autoComplete="username"
            />
            {validationErrors.username && (
              <span className={styles.errorText}>{validationErrors.username}</span>
            )}
          </div>
          
          <div className={styles.formGroup}>
            
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${validationErrors.password ? styles.inputError : ''}`}
              placeholder="Password"
              autoComplete="current-password"
            />
            {validationErrors.password && (
              <span className={styles.errorText}>{validationErrors.password}</span>
            )}
          </div>
          
          {error && (
            <div className={styles.apiError}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                <span>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <div className={styles.demoCredentials}>
          <p>Demo credentials:</p>
          <p>Username: <strong>emilys</strong></p>
          <p>Password: <strong>emilyspass</strong></p>
        </div>
      </div>
    </div>
  );
}