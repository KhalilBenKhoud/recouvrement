import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { TypeORMError } from 'typeorm';
import { ErrorResponse } from '../utils/ErrorResponse';

const errorHandler: ErrorRequestHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (err instanceof ErrorResponse) {
		return res
			.status(err.httpCode)
			.json({ success: false, message: err.message });
	}
	if (process.env.ENVIRONMENT === 'dev' && err instanceof TypeORMError) {
		console.log(`Error name : ${err.name}, Error message:  ${err.message}`);
		return res.status(504).json({ success: false, message: 'database error' });
	}

	return res
		.status(500)
		.json({ success: false, message: 'Internal server error' });
};

export { errorHandler };
