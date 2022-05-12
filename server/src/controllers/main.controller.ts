import { MainService } from '@services/main.service';
import { IRouter, NextFunction, Request, Response, Router } from 'express';
import { IController } from '@interfaces/global';
import { singleton } from 'tsyringe';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { RequestWithUser, UserLoginDto, UserResponseDto } from '@dto/auth.dto';
import { RoleEnum } from '@entities/User';

@singleton()
export class MainController implements IController {
	private readonly _router: IRouter;

	public get router() {
		return this._router;
	}
	constructor(
		//private readonly _mainService: MainService,
		private readonly _authMiddleware: AuthMiddleware,
	) {
		this._router = Router();
		this.initRoutes();
	}

	private async getProfile(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) {
		try {
			res
				.status(200)
				.json({ success: true, user: new UserResponseDto(req.user!) });
		} catch (error) {
			next(error);
		}
	}

	private async getInvoices(req: Request, res: Response, next: NextFunction) {}

	private async getDebts(req: Request, res: Response, next: NextFunction) {}

	initRoutes(): void {
		//all these routes needs authentication
		this._router.use(
			this._authMiddleware.authenticate.call(this._authMiddleware),
		);
		this._router.get(
			'/profile',
			this._authMiddleware.authenticate,
			this.getProfile,
		);
		this._router.get('/debts', this._authMiddleware.authenticate);
		this._router.get('/invoices/all', this._authMiddleware.authenticate);
	}
}
