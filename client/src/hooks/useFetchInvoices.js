import { useState, useEffect, useCallback } from 'react';
import { DataService } from '../services/DataService';
import { useAuth } from '../context/auth-context';
export function useFetchInvoices() {
	const { isAuth, accessToken } = useAuth();
	const [pageNumber, setPageNumber] = useState(1);
	const [totalInvoices, setTotalInvoices] = useState(0);
	const [invoices, setInvoices] = useState([]);
	// should change from datePicker
	const [dateRange, setDateRange] = useState([]);

	const fetchInvoices = useCallback(
		async (pageNumber, filters) => {
			if (!isAuth) return;
			try {
				const data = await DataService.getInvoices(
					accessToken,
					pageNumber,
					filters,
				);
				setInvoices(data.invoices);
				setTotalInvoices(data.total);
			} catch (error) {
				console.log(error);
			}
		},
		[accessToken, isAuth],
	);

	useEffect(() => {
		const filters = {
			status: null,
			category: null,
			dateRange: {
				minRange: dateRange.length
					? dateRange[0]
					: new Date(new Date().setFullYear(2000)),
				maxRange: dateRange.length === 2 ? dateRange[1] : new Date(Date.now()),
			},
		};
		fetchInvoices(pageNumber, filters);
	}, [pageNumber, dateRange, fetchInvoices]);

	return {
		pageNumber,
		setDateRange,
		setPageNumber,
		totalInvoices,
		invoices,
	};
}
