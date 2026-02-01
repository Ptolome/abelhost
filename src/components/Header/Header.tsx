'use client';

import Link from 'next/link';
import st from './Header.module.scss';
import Communication from './Communication';
import Navigation from '../Navigation';


const Header = () => {
  
  return (
    <header className={st.header}>     
    <Communication/>
      <div className={st.container}>
        <div className={st.logo}>
          <Link href="/">Abelohost Shop</Link>
        </div>
        <div className={st.block}>600 x 70</div>
      </div>

      <Navigation/>
    </header>
  );
};

export default Header;