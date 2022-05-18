import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
export default function GuestOnly({ children }) {
	const { isAuth } = useAuth();

	if (isAuth) {
		return <Navigate to='/' />;
	}

	return children;
}
