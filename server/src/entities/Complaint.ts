import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './utils/BaseEntity';

@Entity()
export class Complaint extends BaseEntity {
	@Column()
	title: string;
	@Column()
	description: string;
	@ManyToOne(() => User, (user) => user.complaints)
	owner: User;
}
