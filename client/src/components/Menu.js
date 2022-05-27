import React from 'react'
import { useAuth } from '../context/auth-context';

const Menu = () => {
  
    const { logout } = useAuth();
  
    return (
    <div className='menu'>
        <button>Profile</button>
        <button onClick={async () => {
            await logout()
        }}>Sign out</button>
    </div>
  )
}

export default Menu