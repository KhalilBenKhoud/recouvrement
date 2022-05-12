import axios from 'axios';
import { AuthService } from '../services/AuthService';

const axiosClient = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

const responseBlackList = [
	'/auth/login',
	'/auth/register',
	'/auth/refresh-token',
];
const requestBlacklist = [...responseBlackList, '/home'];

axiosClient.interceptors.request.use(
	(request) => {
		console.log(request);
		if (!requestBlacklist.includes(request.url)) {
			const token = localStorage.getItem('accessToken');
			if (token) {
				request.headers['Authorization'] = `Bearer ${token}`;
			}
		}
		return request;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const config = error.config;
		console.log(config);
		if (
			error.response.status === 401 &&
			!config._retry &&
			!responseBlackList.includes(config.url)
		) {
			console.log('iin');
			config._retry = true;
			try {
				const { accessToken } = await AuthService.refreshToken();

				localStorage.setItem('accessToken', accessToken);
			} catch (_error) {
				if (_error.response && _error.response.data) {
					return Promise.reject(_error.response.data);
				}
			}
			return axiosClient(config);
		}
		return Promise.reject(error);
	},
);

export { axiosClient as httpClient };
