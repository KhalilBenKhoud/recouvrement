import { InvoiceFiltersQuery } from './../dto/invoice.dto';
import { Complaint } from './../entities/Complaint';
import { CreateComplaintDto } from './../dto/complaint.dto';
import { Invoice, InvoiceStatus } from '@entities/Invoice';
import { User } from '@entities/User';
import { delay, inject, injectable } from 'tsyringe';
import { Connection, FindManyOptions, Repository, In } from 'typeorm';

@injectable()
export class ClientService {
	private _complaintRepository: Repository<Complaint>;
	private _invoiceRepository: Repository<Invoice>;

	constructor(@inject(delay(() => Connection)) _connection: Connection) {
		this._complaintRepository = _connection.getRepository(Complaint);
		this._invoiceRepository = _connection.getRepository(Invoice);
	}

	async getInvoices(
		userId: number,
		page: number,
		filters: InvoiceFiltersQuery | null,
		perPage: number = 8,
	): Promise<Invoice[]> {
		// TODO: extract to utils functions
		const whereConditions: any = { id: userId };

		if (!!filters && !!Object.keys(filters).length) {
			if (!!filters.category) {
				whereConditions.category = filters.category;
			}
			if (!!filters.status) {
				whereConditions.status = filters.status;
			}
			if (filters.dateRange) {
				whereConditions.createdAt = In<Date>([
					filters.dateRange.minDate,
					filters.dateRange.maxDate,
				]);
			}
		}
		const options: FindManyOptions = {
			where: whereConditions,
			order: {
				createdAt: 'DESC',
			},
			skip: perPage * (page - 1),
			take: perPage,
		};

		return this._invoiceRepository.find(options);
	}

	async createComplaint(user: User, complaint: CreateComplaintDto) {
		return this._complaintRepository.save({ owner: user, ...complaint });
	}
}
