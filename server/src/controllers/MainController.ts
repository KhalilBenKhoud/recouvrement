import { NextFunction, Request, Response } from 'express';

export class MainController {
	static findAll(req: Request, res: Response, next: NextFunction) {
		return { ...req.body };
	}
}
