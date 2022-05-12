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
import { AuthService } from './services/AuthService';

function Test() {
	async function login() {
		try {
			const res = await AuthService.login({
				cin: '12345677',
				password: 'hamzak',
			});
			localStorage.setItem('accessToken', res.accessToken);
		} catch (error) {
			console.log(error);
		}
	}
	async function refreshToken() {
		try {
			const res = await AuthService.refreshToken();
			localStorage.setItem('accessToken', res.accessToken);
		} catch (error) {
			console.log(error);
		}
	}
	async function getProfile() {
		try {
			const { data: user } = await AuthService.profile();
			localStorage.setItem('user', JSON.stringify(user));
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div>
			<button onClick={login}> test login</button>
			<button onClick={refreshToken}> test refresh token</button>
			<button onClick={getProfile}> test profile</button>
		</div>
	);
}
function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/test' element={<Test />} />
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
