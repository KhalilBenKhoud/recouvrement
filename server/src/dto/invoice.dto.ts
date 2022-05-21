import { UserResponseDto } from './auth.dto';
import { InvoiceStatus } from '@entities/Invoice';
import { IsEnum, IsIdentityCard, IsObject, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceFiltersQuery {
	@IsEnum(InvoiceStatus)
	status?: InvoiceStatus;

	@IsString()
	category?: string;

	dateRange?: {
		minDate: Date;
		maxDate: Date;
	};
}

export class InvoiceResponseDto {
	value: number;
	originalValue: number;

	currency: number;

	title: string;

	status: InvoiceStatus;

	category: string;

	owner: UserResponseDto;
}
