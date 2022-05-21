import { Datepicker } from './DatePicker';
import { TableRow } from './TableRow';
import { Dropdown } from './Dropdown';
function Table({ invoices }) {
	const values = [
		{
			id: 1,
			title: 'Test king',
			value: 34.2,
			category: 'Internet',
			status: 0,
		},
		{
			id: 1,
			title: 'Test king',
			value: 34.2,
			category: 'Internet',
			status: 2,
		},
		{
			id: 1,
			title: 'Test king',
			value: 34.2,
			category: 'Internet',
			status: 0,
		},
		{
			id: 1,
			title: 'Test king',
			value: 34.2,
			category: 'Internet',
			status: 1,
		},
	];
	return (
		<div className='w-3/4 h-full bg-white shadow-lg rounded-sm border border-slate-200'>
			<header className='px-5 pt-5 pb-6 border-b border-slate-100 flex justify-between'>
				<h2 className='font-semibold text-slate-800 text-lg'>Invoices</h2>
				<div className=' flex'>
					<Dropdown
						options={['Pending', 'Paid', 'Overdue']}
						value='Status'
						onChange={(e) => console.log(e.target.value)}
					/>
					<Datepicker />
				</div>
			</header>
			<div className='p-3'>
				{/* Table */}
				<table className='table-auto w-full min-h-full divide-y divide-gray-200'>
					{/* Table header */}
					<thead className='text-xs  uppercase text-slate-400 bg-slate-50 rounded-sm'>
						<tr>
							<th className='pl-4 p-2'>
								<div className='font-semibold text-left'>Id</div>
							</th>
							<th className='p-2'>
								<div className='font-semibold text-center'>Title</div>
							</th>
							<th className='p-2'>
								<div className='font-semibold text-center'>Value</div>
							</th>
							<th className='p-2'>
								<div className='font-semibold text-center'>Category</div>
							</th>
							<th className='p-2'>
								<div className='font-semibold text-center'>Status</div>
							</th>
							<th className='p-2'>
								<div className='font-semibold text-center'>Date</div>
							</th>
						</tr>
					</thead>
					{/* Table body */}
					<tbody className='text-xs  font-medium  text-gray-900'>
						{/* Row */}

						{values &&
							values.length &&
							values.map((a) => <TableRow invoice={a} />)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Table;
