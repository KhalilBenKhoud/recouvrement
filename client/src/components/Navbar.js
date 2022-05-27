import { useState } from 'react';
import searchIcon from '../assets/search.svg';
import userIcon from '../assets/user.png';
import Menu from './Menu';


const Navbar = () => {
	
	const [menu, setMenu] = useState(false)
	return (
		<nav className='navbar'>
			<div className='input-container'>
				<input type='text' id='nav-input' placeholder='Search' />
				<img src={searchIcon} alt='search' className='searchIcon' />
			</div>
			<div className='user'>
				<img src={userIcon} alt='user' className='userIcon' onClick={()=> {
					setMenu(prev => !prev)
				}}/>
				 { menu && <Menu /> }
				<span>User</span>
			</div>
		</nav>
	);
};

export default Navbar;
