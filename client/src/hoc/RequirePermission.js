import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
export function RequirePermission({ roles }) {
	const { userRole } = useAuth();
	if (!!roles && roles.length && !roles.includes(userRole)) {
		return <Navigate to='/' />;
	}

	return <Outlet />;
}
