import { MainService } from '@services/main.service';
import { IRouter, NextFunction, Request, Response, Router } from 'express';
import { IController } from '@interfaces/global';
import { singleton } from 'tsyringe';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { RequestWithUser, UserLoginDto } from '@dto/auth.dto';

@singleton()
export class MainController implements IController {
	private readonly _router: IRouter;

	public get router() {
		return this._router;
	}
	constructor(
		private readonly _mainService: MainService,
		private readonly _authMiddleware: AuthMiddleware,
	) {
		this._router = Router();
	}

	private async getProfile(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) {
		try {
			const user = req.user as UserLoginDto;
			res.status(200).json({ success: true, user: user });
		} catch (error) {
			next(error);
		}
	}

	registerRoutes(): void {
		this._router.get(
			'/profile',
			this._authMiddleware.authenticate,
			this.getProfile.bind(this),
		);
		// TODO: change the middleware so it takes a role argument
		// this._router.get('/debts', this._authMiddleware.authenticate, )
	}
}
