import { UserResponseDto } from './auth.dto';
import { IsDefined, IsString, isString } from 'class-validator';

export class CreateComplaintDto {
	@IsDefined()
	@IsString()
	title: string;

	@IsDefined()
	@IsString()
	description: string;
}

export class ComplaintResponseDto {
	title: string;
	description: string;

	constructor(complaint: ComplaintResponseDto) {
		this.title = complaint.title;
		this.description = complaint.description;
	}
}
