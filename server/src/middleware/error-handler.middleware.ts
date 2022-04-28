import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { TypeORMError } from 'typeorm';
import { ErrorResponse } from '@utils/error-response.util';
import { HttpStatus } from '@utils/base-response.util';

const errorHandler: ErrorRequestHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	console.log(err);
	if (err instanceof ErrorResponse) {
		return res
			.status(err.httpCode)
			.json({ success: false, error: err.message });
	}

	if (process.env.ENVIRONMENT === 'dev') {
		if (err instanceof TypeORMError) {
			console.log(`Error name : ${err.name}, Error message:  ${err?.message}`);
			return res
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json({ success: false, error: 'database error' });
		}
		if (err instanceof TokenExpiredError) {
			return res
				.status(HttpStatus.UNAUTHORIZED)
				.json({ success: false, error: 'token expired' });
		}
		if (err instanceof JsonWebTokenError) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json({ success: false, error: 'malformed token error' });
		}
	}

	return res
		.status(HttpStatus.INTERNAL_SERVER_ERROR)
		.json({ success: false, error: 'Internal server error' });
};

export { errorHandler };
