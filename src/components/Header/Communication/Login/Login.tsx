import { useAuthStore } from '@/store/authStore';
import st from './Login.module.scss';
import Image from 'next/image';
import {mail} from '@icons/'
import Link from 'next/link';
import { FC } from 'react';

interface ILogin {
    className?:string
}
const Login:FC<ILogin> = ({className}) => {
    const { user, logout } = useAuthStore();
  return (
    <div className={ className}>
      
        <div  className={st.isAuthBlok}>
           <Image width={28} height={28} src={mail} alt='icon'/>
    
          {user ? 
          (<>
            <span>{user.firstName}</span>
            <span onClick={logout}>Logout</span>
            </>
            ):
            <Link href="/login">Login</Link>}
                      
        </div>
      
    </div>
  )
}

export default Login
