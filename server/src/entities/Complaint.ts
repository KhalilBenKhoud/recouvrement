import { Column, Entity } from "typeorm";
import { BaseEntity } from "./utils/BaseEntity";

@Entity()
export class Complaint extends BaseEntity {
	@Column()
	title: string;
	@Column()
	description: string;
}
