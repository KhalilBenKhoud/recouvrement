import { createContext, useContext, useState } from 'react';
import { AuthService } from '../services/AuthService';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [accessToken, setAccessToken] = useState(
		null
	);
	const [user, setUser] = useState(localStorage.getItem('user'));
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState(null);
	const login = async (credentials) => {
		try {
			setIsLoading(true);
			const res = await AuthService.login(credentials);
			//localStorage.setItem('user', res.user);
			//localStorage.setItem('accessToken', res.accessToken);
			setUser(res.user);
			setAccessToken(res.accessToken);
			setIsLoading(false);
		} catch (error) {
			setErrors([...errors, error.message]);
		} finally {
			setIsLoading(false);
		}
	};

	const register = () => {};

	const logout = () => {};

	const value = {
		isAuth: !!accessToken && !!user,
		user,
		accessToken,
		isLoading,
		login,
		register,
		logout,
		errors,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
