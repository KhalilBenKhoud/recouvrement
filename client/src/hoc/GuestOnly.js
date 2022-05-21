import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
export default function GuestOnly({ children }) {
	const { isAuth, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isAuth && !isLoading) {
		return <Navigate to='/' />;
	}

	return children;
}
