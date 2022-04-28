import { HttpStatus } from './base-response.util';

export class ErrorResponse extends Error {
	private readonly _statusCode?: number;
	public httpCode: HttpStatus;
	get statusCode() {
		return this._statusCode;
	}

	constructor(
		public message: string,
		httpCode: number,
		internalStatusCode?: number,
	) {
		super(message);
		this.httpCode = httpCode;
		this._statusCode = internalStatusCode;
	}

	static badRequest(message?: string) {
		return new this(message || 'Bad request', HttpStatus.BAD_REQUEST);
	}

	static notAuthorized(message?: string) {
		return new this(
			message || "You're not authenticated, please login!",
			HttpStatus.UNAUTHORIZED,
		);
	}

	static forbidden(message?: string) {
		return new this(
			message || "You don't have permission to access this resource",
			HttpStatus.FORBIDDEN,
		);
	}

	static duplicateEntry(message?: string) {
		return new this(message || 'User already exists', 409);
	}

	static notFound(message?: string) {
		return new this(message || 'Resource Not Found', HttpStatus.NOT_FOUND);
	}

	static internalServerError(message?: string) {
		return new this(
			message || 'Internal Server Error',
			HttpStatus.INTERNAL_SERVER_ERROR,
		);
	}
}
