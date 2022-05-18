import React from 'react';

const SubmitButton = ({ content, onClick }) => {
	return (
		<button className='submitButton' onClick={onClick}>
			{content}
		</button>
	);
};

export default SubmitButton;
