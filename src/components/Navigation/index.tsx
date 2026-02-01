import Link from 'next/link'
import st from './Navigation.module.scss'

const Navigation = () => {
  return (
     <nav className={st.nav}>
          <Link href="/" >Home</Link>
          <Link href="/hot-deals">Hot Deals</Link>                    
          <Link href="/categories">Categories</Link>
          <Link href="/laptops">Laptops</Link>
          <Link href="/smartphones">Smartphones</Link>
          <Link href="/cameras">Cameras</Link>
          <Link href="/accessories">Accessories</Link>
        </nav>
  )
}

export default Navigation
