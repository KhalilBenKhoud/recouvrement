import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import Requests from './pages/Requests';
import { GuestOnly, RequireAuth } from './hoc';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route
					path='/login'
					element={
						<GuestOnly>
							<Login />
						</GuestOnly>
					}
				/>
				<Route
					path='/create'
					element={
						<GuestOnly>
							<CreateAccount />
						</GuestOnly>
					}
				/>
				<Route
					path='/forgot'
					element={
						<GuestOnly>
							<ForgotPassword />
						</GuestOnly>
					}
				/>

				<Route
					path='/'
					element={
						<RequireAuth>
							<Layout />
						</RequireAuth>
					}
				>
					<Route path='' exact element={<Home />} />
					<Route path='dashboard' element={<Dashboard />} />
					<Route path='invoices' element={<Invoices />} />
					<Route path='requests' element={<Requests />} />
				</Route>

				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
