import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
ReactDOM.render(
	<Router>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</Router>,
	document.getElementById('root'),
);
