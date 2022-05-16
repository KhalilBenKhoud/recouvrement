import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Requests from './pages/Requests';

function App() {
	return (
		<div className='App'>
			<Routes>
				
				<Route path='/login' element={<Login />} />
				<Route path='/create' element={<CreateAccount />} />
				<Route path='/forgot' element={<ForgotPassword />} />

				<Route path='/' element={<Layout />}>
					<Route path='' exact element={<Home />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='about' element={<About />} />
					<Route path='requests' element={<Requests />} />
				</Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
