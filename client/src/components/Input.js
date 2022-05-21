import React from 'react';

const Input = ({ label, type, placeholder, onChange }) => {
	return (
		<div>
			<label htmlFor='in'>{label}</label> <br />
			<input
				id='in'
				type={type}
				placeholder={placeholder}
				onChange={(e) => {
					e.preventDefault();
					onChange(e.target.value);
				}}
				required
			/>
		</div>
	);
};

export default Input;
