'use client';

import Link from 'next/link';
import Communication from './Communication';
import Navigation from '../Navigation';
import Image from 'next/image';
import {point} from '@icons/'

import st from './Header.module.scss';


const Header = () => {
  
  return (
    <header className={st.header}>     
    <Communication/>
      <div className={st.container}>
        <div className={st.logo}>
          <Link href="/">Abelohost Shop</Link>
          <Image src={point} width={8} height={8} alt='point'/>
        </div>
        <div className={st.block}>600 x 70</div>
      </div>

      <Navigation/>
    </header>
  );
};

export default Header;