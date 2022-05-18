import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
} from 'react';
import { AuthService } from '../services/AuthService';

function getUserFromAccessToken(accessToken) {
	return window.atob(accessToken.split('.')[1]);
}

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [accessToken, setAccessToken] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const requestRefreshToken = useCallback(async () => {
		try {
			setIsLoading(true);
			const { accessToken } = await AuthService.refreshToken();
			console.log(accessToken);
			setAccessToken(accessToken);
		} catch (error) {
			setError();
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		requestRefreshToken();
	}, [requestRefreshToken]);

	const login = useCallback(async (credentials) => {
		try {
			setIsLoading(true);
			const { accessToken } = await AuthService.login(credentials);
			setAccessToken(accessToken);
		} catch (error) {
			console.log(error);
			setError(error.response?.data?.error ?? 'Unknown error');
			return false;
		} finally {
			setIsLoading(false);
		}
		return true;
	}, []);

	const register = useCallback(async (userInput) => {
		try {
			setIsLoading(true);
			const { accessToken } = await AuthService.register(userInput);
			setAccessToken(accessToken);
		} catch (error) {
			console.log(error);
			setError(error.response?.data?.error ?? 'Unknown error');
			return false;
		} finally {
			setIsLoading(false);
		}
		return true;
	}, []);

	const logout = useCallback(async () => {
		try {
			setIsLoading(true);
			await AuthService.logout(accessToken);
			setAccessToken(null);
		} catch (error) {
			console.log(error);
			//setErrors();
		} finally {
			setIsLoading(false);
		}
	}, [accessToken]);

	const value = {
		isAuth: !!accessToken,
		user: !!accessToken && getUserFromAccessToken(accessToken),
		accessToken,
		isLoading,
		login,
		register,
		logout,
		error,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
