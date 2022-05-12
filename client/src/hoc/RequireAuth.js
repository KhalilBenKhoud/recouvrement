import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
export function RequireAuth({ children }) {
	const { isAuth } = useAuth();
	if (isAuth) {
		return <Navigate to='/login' />;
	}

	return children;
}
