import { httpClient } from '../config/http-clients';
import { authHeader } from '../helpers/global';
export class AuthService {
	static async login(credentials) {
		const { data } = await httpClient.post('/auth/login', credentials);
		return data?.body;
	}
	static async profile(accessToken) {
		return httpClient.get('/profile', authHeader(accessToken));
	}

	static async register(userInput) {
		const { data } = await httpClient.post('/auth/register', userInput);
		return data?.body;
	}

	static async logout(accessToken) {
		return httpClient.post('/auth/logout', {}, authHeader(accessToken));
	}

	static async refreshToken() {
		const { data } = await httpClient.post('/auth/refresh-token');
		return data?.body;
	}
}
