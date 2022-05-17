import { useState } from 'react';
import createImg from '../assets/create-account.jpeg';
import Input from '../components/Input';
import github from '../assets/github.png';
import twitter from '../assets/twitter.png';
import { Link, useNavigate } from 'react-router-dom';
import SocialButton from '../components/SocialButton';
import SubmitButton from '../components/SubmitButton';
import { useAuth } from '../context/auth-context';
const CreateAccount = () => {
	const [cin, setCin] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [lastName, setLastName] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const { register, isLoading, error } = useAuth();
	const navigateTo = useNavigate();
	const registerHandler = async () => {
		if (!!cin && !!firstName && !!lastName && !!email && !!password) {
			if (await register({ firstName, lastName, cin, email, password })) {
				console.log('true');
				navigateTo('/');
			} else {
				console.log(error);
			}
		}
	};
	if (isLoading) {
		return <div>IsLoading...</div>;
	}
	return (
		<section id='create'>
			<div className='container-create'>
				<img src={createImg} alt='create' />
				<div className='create-info'>
					<h1>Create account</h1>
					<form>
						<Input
							label='First Name'
							type='text'
							placeholder='firstName'
							onChange={(v) => setFirstName(v)}
						/>
						<Input
							label='Last Name'
							type='text'
							placeholder='firstName'
							onChange={(v) => setLastName(v)}
						/>
						<Input
							label='Email'
							type='email'
							placeholder='Email'
							onChange={(v) => setEmail(v)}
						/>
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
							onChange={(v) => setPassword(v)}
						/>
						<Input
							label='Confirm password'
							type='password'
							placeholder='password'
							onChange={() => {}}
						/>
						<div>
							<input type='checkbox' id='check' required />
							<label for='check'> I agree to the privacy policy</label>
						</div>
						<SubmitButton content='Create account' onClick={registerHandler} />
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

					<Link id='link' to='/login'>
						Already have an account? Login
					</Link>
				</div>
			</div>
		</section>
	);
};

export default CreateAccount;
