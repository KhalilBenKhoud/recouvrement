import { User } from '@entities/User';
import { Type } from 'class-transformer';
import {
	IsAlphanumeric,
	IsDefined,
	IsEmail,
	IsString,
	Length,
	MinLength,
} from 'class-validator';
import { Request } from 'express';

export class UserRegistrationDto {
	@IsString()
	@MinLength(3)
	firstName: string;

	@IsString()
	@MinLength(3)
	lastName: string;

	@IsEmail()
	email: string;

	@IsDefined()
	@IsAlphanumeric()
	@Type(() => Number)
	cin: number;

	@IsString()
	@MinLength(6)
	password: string;
}

export class UserLoginDto {
	@IsAlphanumeric()
	@Length(8, 8)
	@Type(() => Number)
	cin: number;

	@IsString()
	@MinLength(6)
	password: string;
}

export interface RequestWithUser extends Request {
	user?: User;
}
