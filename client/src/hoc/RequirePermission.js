import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
export default function RequirePermission({ roles, children }) {
	const { user } = useAuth();
	if (!!roles && roles.length && !roles.includes(user.role)) {
		return <Navigate to='/' />;
	}

	return children;
}
