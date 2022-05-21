import { UserResponseDto } from './auth.dto';
import { InvoiceStatus } from '@entities/Invoice';
import { IsEnum, IsIdentityCard, IsObject, IsString } from 'class-validator';

import { IsNullable } from '@validators/global.validator';

export class InvoiceFiltersQuery {
	@IsNullable()
	@IsEnum(InvoiceStatus)
	status?: InvoiceStatus | null;

	@IsNullable()
	@IsString()
	category?: string | null;

	//isDateRange()
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
