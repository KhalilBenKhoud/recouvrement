import { User } from '@entities/User';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Category } from './Category';
import { BaseEntity } from './utils/BaseEntity';

export enum Currency {
	TND,
	USD,
	EUR,
}

export enum InvoiceStatus {
	PENDING,
	PAID,
	OVERDUE,
}
@Entity()
export class Invoice extends BaseEntity {
	@Column()
	value: number;

	@Column({ name: 'original_value', nullable: true })
	originalValue: number;

	@Column({ default: Currency.TND, enum: Currency, type: 'integer' })
	currency: number;

	@Column({ nullable: true })
	description: string;

	@Column()
	status: InvoiceStatus;

	@ManyToOne(() => User, (user) => user.invoices)
	owner: User;

	@ManyToOne(() => Category, (category) => category.debts)
	category: Category;
}
