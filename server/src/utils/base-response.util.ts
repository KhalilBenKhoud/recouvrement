import { Response } from 'express';

export class BaseResponse {
	constructor(
		private response: Response,
		public httpCode: HttpStatus,
		public resultItem: any = null,
		public isSuccess: boolean = true,
		public error: string | null = null,
	) {
		response
			.status(httpCode)
			.json({ body: resultItem, success: isSuccess, error });
	}
}

export enum HttpStatus {
	SWITCHING_PROTOCOLS = 101,
	PROCESSING = 102,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NO_CONTENT = 204,
	PERMANENT_REDIRECT = 308,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	REQUEST_TIMEOUT = 408,
	INTERNAL_SERVER_ERROR = 500,
}
