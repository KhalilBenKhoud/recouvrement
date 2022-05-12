import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './Invoice';

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	label: string;

	@Column()
	incrementPeriod: Date;

	@Column()
	interestRate: Number;

	@OneToMany(() => Invoice, (invoice) => invoice.category)
	debts: Invoice[];
}
