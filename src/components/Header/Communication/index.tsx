import React from 'react'
import st from './Communication.module.scss'
import {data} from './const'
import Image from 'next/image'
import Login from './Login/Login'



const Communication = () => {
  return (
    <div className={st.wripper}>
      {data.map(({id,title, icon})=>(
        <div key={id} className={st.item}>
           <Image width={28} height={28} src={icon} alt='icon'/>

          <span className={st.title}>{title}</span>
        </div>
      ))}
      
      <Login className={st.auth}/>
    </div>
    
    
  )
}

export default Communication
