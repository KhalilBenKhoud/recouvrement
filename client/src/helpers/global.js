export function authHeader(accessToken) {
	return {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
}
