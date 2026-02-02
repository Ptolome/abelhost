'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { user } = useAuthStore();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
         <div className={styles.copyright}>
          <p>© {currentYear} Abelohost Shop</p>
          {user && (
            <p className={styles.userEmail}>Logged as {user.email}</p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;