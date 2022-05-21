import React from 'react';
import { useFetchInvoices } from '../hooks/useFetchInvoices';

const Pagination = () => {
	const { pageNumber, setPageNumber, totalInvoices } = useFetchInvoices();

	const totalPages = Math.ceil(totalInvoices / pageNumber);

	const goToNext = () => {
		setPageNumber((prev) => prev + 1);
	};

	const goToPrevious = () => {
		setPageNumber((prev) => prev - 1);
	};

	return (
		<div class='flex flex-col items-center'>
			<span class='text-sm text-gray-300'>
				Showing{' '}
				<span class='font-semibold text-white'>{8 * (pageNumber - 1) + 1}</span>{' '}
				to <span class='font-semibold text-white'>{8 * pageNumber}</span> of{' '}
				<span class='font-semibold text-white'>{totalInvoices}</span> Entries
			</span>
			<div class='inline-flex mt-2 xs:mt-0'>
				<button
					onClick={goToPrevious}
					disabled={pageNumber === 1}
					class='inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-600   hover:text-white disabled:cursor-not-allowed disabled:bg-gray-900'
				>
					<svg
						class='mr-2 w-5 h-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
							clipRule='evenodd'
						></path>
					</svg>
					Prev
				</button>
				<button
					onClick={goToNext}
					disabled={pageNumber === totalPages}
					class='inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-600   hover:text-white disabled:cursor-not-allowed disabled:bg-gray-800'
				>
					Next
					<svg
						class='ml-2 w-5 h-5'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fill-rule='evenodd'
							d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
							clipRule='evenodd'
						></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Pagination;
