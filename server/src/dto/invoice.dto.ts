import { UserResponseDto } from './auth.dto';
import { InvoiceStatus } from '@entities/Invoice';
import { IsEnum, IsString } from 'class-validator';

import { IsNullable, IsValidDateRange } from '@validators/global.validator';

interface DateRange {
	minDate?: Date;
	maxDate?: Date;
}

export class InvoiceFiltersQuery {
	@IsNullable()
	@IsEnum(InvoiceStatus)
	status?: InvoiceStatus | null;

	@IsNullable()
	@IsString()
	category?: string | null;

	@IsValidDateRange()
	dateRange?: DateRange;
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
