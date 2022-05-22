import { RoleEnum, User } from '@entities/User';
import { Type } from 'class-transformer';
import {
	IsDefined,
	IsEmail,
	IsIdentityCard,
	IsNumber,
	IsString,
	MinLength,
} from 'class-validator';
import { Request } from 'express';

export class UserRegistrationDto {
	@IsDefined()
	@IsString()
	@MinLength(3)
	firstName: string;

	@IsDefined()
	@IsString()
	@MinLength(3)
	lastName: string;

	@IsDefined()
	@IsEmail()
	email: string;

	@IsIdentityCard('ar-TN')
	cin: string;

	@IsDefined()
	@IsString()
	@MinLength(6)
	password: string;
}

export class UserLoginDto {
	@IsIdentityCard('ar-TN')
	cin: string;

	@IsDefined()
	@IsString()
	@MinLength(6)
	password: string;
}

export class UserResponseDto {
	public firstName: string;
	public lastName: string;
	public email: string;
	public cin: string;
	public role: RoleEnum;

	constructor(user: User) {
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.email = user.email;
		this.cin = user.cin.toString();
		this.role = user.role;
	}
}
export interface RequestWithUser extends Request {
	user?: User;
}
