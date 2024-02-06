import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import {AuthContext} from '../Context/AuthContext'

const Navbar = () => {
  const {currentUser}= useContext(AuthContext)
  return (
    <div className='navbar'>
        <span className='logo'>Mahimas Chat</span>
        <div className='user'>
           <img src={currentUser.photoURL} className='adityaPhoto' />
           <span>{currentUser.displayName}</span> 
           <button className='logOut' onClick={() =>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar
