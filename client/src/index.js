import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context';
//Auth provider should wrap the app
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
