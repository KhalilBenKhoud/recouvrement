import { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import { useFetchInvoices } from '../hooks/useFetchInvoices';

const Invoices = () => {
	const { invoices, isLoading } = useFetchInvoices;

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<section id='about'>
			<Table invoices={invoices} />

			<Pagination />
		</section>
	);
};

export default Invoices;
