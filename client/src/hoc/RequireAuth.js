import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
export default function RequireAuth({ children }) {
	const { isAuth, isLoading } = useAuth();
	if (isLoading) {
		return <div>Loading ...</div>;
	}
	if (!isAuth) {
		return <Navigate to='/login' />;
	}

	return children;
}
