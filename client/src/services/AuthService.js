import { httpClient } from '../config/http-clients';

export class AuthService {
	static async login(credentials) {
		const { data } = await httpClient.post('/auth/login', credentials);
		return data?.body;
	}
	static async profile() {
		return httpClient.get('/profile');
	}
	static async register(userInput) {
		const { data } = await httpClient.post('/auth/register', userInput);
		return data?.body;
	}

	static async logout() {
		return httpClient.post('/logout');
	}

	static async refreshToken() {
		const { data } = await httpClient.post('/auth/refresh-token');
		return data?.body;
	}
}
