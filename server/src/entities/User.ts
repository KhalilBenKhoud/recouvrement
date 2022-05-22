import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';
import { Complaint } from './Complaint';
import { Invoice } from './Invoice';
import { BaseEntity } from './utils/BaseEntity';

export enum RoleEnum {
	CLIENT = 0,
	ADMIN = 1,
}

@Entity()
export class User extends BaseEntity {
	@Column({ name: 'first_name' })
	firstName: string;

	@Column({ name: 'last_name' })
	lastName: string;

	@Column({ unique: true, length: 8 })
	cin: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({ name: 'reset_password_token', default: null })
	resetPasswordToken: string;

	@Column({ name: 'reset_token_expiration', default: null })
	resetPasswordTokenExpiration: Date;

	@Column({ name: 'token_version', default: 0 })
	tokenVersion: number;

	@Column({ default: 0 })
	role: RoleEnum;

	@OneToMany(() => Invoice, (invoice) => invoice.owner)
	invoices: Invoice[];

	@OneToMany(() => Complaint, (complaint) => complaint.owner)
	complaints: Complaint[];
}
