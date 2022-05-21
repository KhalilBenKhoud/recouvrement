import { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import HomeIcon from '../assets/home.png';
import AboutIcon from '../assets/about.png';
import DashboardIcon from '../assets/dashboard.png';
import RequestsIcon from '../assets/request.png';

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<a
				href='https://www.tunisietelecom.tn/Fr'
				target='_blank'
				rel='noreferrer'
			>
				<img src={logo} alt='logo' className='logo' />
			</a>
			<ul>
				<li>
					<NavLink to='/' className='navigation'>
						<img src={HomeIcon} alt='home icon' className='icon' /> FAQ
					</NavLink>
				</li>
				<li>
					<NavLink className='navigation' to='/invoices'>
						<img src={AboutIcon} alt='home icon' className='icon' />
						Factures
					</NavLink>
				</li>
				<li>
					<NavLink className='navigation' to='/dashboard'>
						<img src={DashboardIcon} alt='dashboard icon' className='icon' />
						Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink className='navigation' to='/requests'>
						<img src={RequestsIcon} alt='requests icon' className='icon' />
						Réclamations
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
