import { Column, Entity, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { BaseEntity } from "./utils/BaseEntity";

@Entity()
export class Debt extends BaseEntity {
	@Column()
	value: number;
	@Column({ default: "TND", enum: ["TND", "EUR", "USD"] })
	currency: string;
	@Column()
	description: string;
	@ManyToOne(() => Category, (category) => category.debts)
	category: Category;
}
