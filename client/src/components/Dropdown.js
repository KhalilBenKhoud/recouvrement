import React from 'react';
import { useAuth } from '../context/auth-context';

const Dropdown = () => {
	const { logout } = useAuth();
	return (
		<div className='dropdown'>
			<div>Profile</div>
			<button
				onClick={async (e) => {
					e.preventDefault();
					await logout();
				}}
			>
				Sign out
			</button>
		</div>
	);
};

export default Dropdown;
