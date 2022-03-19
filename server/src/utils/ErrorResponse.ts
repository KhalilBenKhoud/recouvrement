export class ErrorResponse extends Error {
	constructor(public message: string, public httpCode: number) {
		super(message);
	}
}

export class NotFound extends ErrorResponse {
	constructor(message?: string) {
		super(message || 'Resource Not Found', 404);
	}
}
export class NotAuthorized extends ErrorResponse {
	constructor(message?: string) {
		super(message || 'Not Authorized', 401);
	}
}

export class Forbidden extends ErrorResponse {
	constructor(message?: string) {
		super(message || 'Not Authorized', 403);
	}
}
export class BadRequest extends ErrorResponse {
	constructor(message?: string) {
		super(message || 'Bad request', 400);
	}
}

export class InternalServerError extends ErrorResponse {
	constructor(message?: string, public cause?: string) {
		super(message || 'Internal Server Error', 500);
	}
}
