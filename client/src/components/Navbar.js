import React from 'react'
import searchIcon from '../assets/search.svg' 

const Navbar = () => {
  return (
    <nav className='navbar'>
     <div className='input-container'>
     <input type="text" id="nav-input" placeholder='Search' /> 
     <img src={searchIcon} alt="search" className="searchIcon"/>
     </div>
    </nav>
  )
}

export default Navbar