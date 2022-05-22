import { Invoice } from './../entities/Invoice';
import { UserLoginDto, UserRegistrationDto } from '@dto/auth.dto';
import { User } from '@entities/User';
import { ErrorResponse } from '@utils/error-response.util';
import bcrypt from 'bcrypt';
import { delay, inject, injectable } from 'tsyringe';
import { Connection, Repository } from 'typeorm';

@injectable()
export class AdminService {
	private _userRepository: Repository<User>;
	private _invoiceRepository: Repository<Invoice>;

	constructor(@inject(delay(() => Connection)) _connection: Connection) {
		this._userRepository = _connection.getRepository(User);
		this._invoiceRepository = _connection.getRepository(Invoice);
	}

	addInvoice(input: Partial<Invoice>): Promise<Invoice> {
		return this._invoiceRepository.save(input);
	}

	getUsers(page: number, perPage: number = 8): Promise<User[]> {
		return this._userRepository.find({
			order: {
				createdAt: 'DESC',
			},
			skip: perPage * (page - 1),
			take: perPage,
		});
	}

	getInvoices(page: number, perPage: number = 8): Promise<Invoice[]> {
		return this._invoiceRepository.find({
			order: {
				createdAt: 'DESC',
			},
			skip: perPage * (page - 1),
			take: perPage,
		});
	}
}
