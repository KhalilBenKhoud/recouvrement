import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Debt } from "./Debt";
import { BaseEntity } from "./utils/BaseEntity";

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	label: string;

	@OneToMany(() => Debt, (debt) => debt.category)
	debts: Debt[];
}
