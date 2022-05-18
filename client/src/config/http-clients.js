import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

export { axiosClient as httpClient };
