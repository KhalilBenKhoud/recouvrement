import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
export default function RequireAuth({ children }) {
	const { isAuth, isMounted, isLoading } = useAuth();
	const location = useLocation();
	if (isLoading) {
		console.log('in');
		return <div>Loading ...</div>;
	}
	if (!isAuth && isMounted) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return children;
}
