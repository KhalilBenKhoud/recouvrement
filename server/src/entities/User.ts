import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './utils/BaseEntity';

export enum RoleEnum {
	USER = 0,
	ADMIN = 1,
}

@Entity()
export class User extends BaseEntity {
	@Column({ name: 'first_name' })
	firstName: string;
	@Column({ name: 'last_name' })
	lastName: string;
	@Column()
	cin: number;
	@Column()
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
}
