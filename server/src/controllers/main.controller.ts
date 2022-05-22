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

	initRoutes(): void {
		this._router.get(
			'/profile',
			this._authMiddleware.authenticate.call(this._authMiddleware),
			this.getProfile,
		);
	}
}
