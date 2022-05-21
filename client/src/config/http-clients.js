import axios from 'axios';
import Qs from 'qs';

const axiosClient = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// Format nested params correctly
axios.interceptors.request.use((config) => {
	config.paramsSerializer = (params) => {
		// Qs is not included in the Axios package
		return Qs.stringify(params, {
			arrayFormat: 'brackets',
			encode: false,
		});
	};

	return config;
});

export { axiosClient as httpClient };
