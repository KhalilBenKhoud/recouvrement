export class ErrorResponse extends Error {
	private readonly _statusCode?: number;
	public httpCode: number;
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
		return new this(message || 'Bad request', 400);
	}

	static notAuthorized(message?: string) {
		return new this(message || "You're not authenticated, please login!", 401);
	}

	static forbidden(message?: string) {
		return new this(
			message || "You don't have permission to access this resource",
			403,
		);
	}

	static duplicateEntry(message?: string) {
		return new this(message || 'User already exists', 409);
	}

	static notFound(message?: string) {
		return new this(message || 'Resource Not Found', 404);
	}

	static internalServerError(message?: string) {
		return new this(message || 'Internal Server Error', 500);
	}
}
