'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { menuBurger, close } from '@icons/';
import Image from 'next/image';
import {navLinks} from './const'

import st from './Navigation.module.scss';


const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={st.nav}>
      <div className={`${st.navDesktop} ${isMobile ? st.hidden : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={st.navLink}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className={`${st.mobileHeader} ${!isMobile ? st.hidden : ''}`}>
        <button
          className={st.menuButton}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
         <Image src={menuBurger} width={24} height={24} alt='menu burger'/>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={st.mobileMenuOverlay}>
          <div 
            className={st.mobileMenuContainer}
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={st.mobileMenuHeader}>
              <h2 className={st.menuTitle}>Menu</h2>
              <button
                className={st.closeButton}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
               <Image src={close} width={24} height={24} alt= 'close button'/>
              </button>
            </div>

            <div className={st.mobileMenuContent}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={st.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;