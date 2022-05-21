import { httpClient } from '../config/http-clients';
import { authHeader } from '../helpers/global';
export class DataService {
	static async getInvoices(accessToken, pageNumber, filters) {
		const { data } = await httpClient.get('/client/invoices/' + pageNumber, {
			...authHeader(accessToken),
			params: filters,
		});
		return data?.body;
	}
}
