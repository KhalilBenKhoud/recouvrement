const StatusEnum = {
	0: {
		literal: 'Pending',
		color: 'bg-yellow-200 text-yellow-800',
	},
	1: {
		literal: 'Paid',
		color: 'bg-green-100 text-green-800',
	},
	2: {
		color: 'bg-red-200 text-red-900',
		literal: 'Overdue',
	},
};

const formatter = new Intl.DateTimeFormat('fr', {
	timeStyle: 'short',
	dateStyle: 'medium',
});
export function TableRow({ invoice }) {
	return (
		<tr key={invoice.id} className='border-b border-gray-200'>
			<td className='p-4 w-1/12'>
				<div className='text-slate-800 '>{invoice.id}</div>
			</td>
			<td className='p-2 w-3/12'>
				<div className='text-center'>{invoice.title}</div>
			</td>
			<td className='p-2 w-1/6'>
				<div className='text-center text-green-700'>${invoice.value}</div>
			</td>
			<td className='p-2 w-1/6'>
				<div className='text-center'>{invoice.category}</div>
			</td>
			<td className='p-2 w-1/6'>
				<span
					class={`px-3 m-auto w-max block text-xs leading-5 font-semibold rounded-full ${
						StatusEnum[invoice.status].color
					} `}
				>
					{StatusEnum[invoice.status].literal}
				</span>
			</td>
			<td className='p-2'>
				<div className=' text-gray-500 text-center'>
					{formatter.format(invoice.createdAt)}
				</div>
			</td>
		</tr>
	);
}
