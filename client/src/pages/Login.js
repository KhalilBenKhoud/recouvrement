import { useState } from 'react';
import loginImg from '../assets/login-office.jpeg';
import Input from '../components/Input';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';
import { Link, useNavigate } from 'react-router-dom';
import SocialButton from '../components/SocialButton';
import SubmitButton from '../components/SubmitButton';
import { useAuth } from '../context/auth-context';
const Login = () => {
	const { login, isLoading, error } = useAuth();
	const [cin, setCin] = useState(null);
	const [password, setPassword] = useState(null);
	const navigateTo = useNavigate();

	const loginHandler = async (e) => {
		e.preventDefault();
		if (!!cin && !!password) {
			console.log(cin, password);
			if (await login({ cin, password })) {
				navigateTo('/');
			} else {
				console.log(error);
			}
		}
	};
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<section id='login'>
			<div className='container-login'>
				<img src={loginImg} alt='loginImg' />
				<div className='login-info'>
					<h1>Login</h1>
					<form>
						<Input
							label='CIN'
							type='text'
							placeholder='CIN'
							onChange={(value) => setCin(value)}
						/>
						<Input
							label='Password'
							type='password'
							placeholder='password'
							onChange={(value) => setPassword(value)}
						/>
						<SubmitButton content='Login' onClick={loginHandler} />
					</form>
					<hr />
					<SocialButton>
						<img src={github} alt='github' />
						<p>Github</p>
					</SocialButton>
					<SocialButton>
						<img src={twitter} alt='github' />
						<p>Twitter</p>
					</SocialButton>
					<Link id='link' to='/forgot'>
						Forgot your password ?
					</Link>
					<Link id='link' to='/create'>
						{' '}
						Create account
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Login;
