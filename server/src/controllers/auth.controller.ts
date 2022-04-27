import { IRouter, NextFunction, Request, Response, Router } from 'express';
import { singleton } from 'tsyringe';
import { AuthService } from '@services/auth.service';
import { IController } from '@interfaces/global';
import {
	RequestWithUser,
	UserLoginDto,
	UserRegistrationDto,
} from '@dto/auth.dto';
import { AuthHelper } from '@helpers/auth.helper';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { ValidateBody } from '@validators/request.validator';

@singleton()
export class AuthController implements IController {
	private _router: IRouter;

	public get router(): IRouter {
		return this._router;
	}

	constructor(
		private readonly _authService: AuthService,
		private readonly _helper: AuthHelper,
		private readonly _authMiddleware: AuthMiddleware,
	) {
		this._router = Router();
		this.registerRoutes();
	}

	@ValidateBody(UserLoginDto)
	private async login(req: Request, res: Response, next: NextFunction) {
		try {
			const userInput = req.body as UserLoginDto;
			const user = await this._authService.login(userInput);
			const accessToken = this._helper.getAccessToken(user);
			this._helper.attachRefreshToken(res, user);
			res.status(200).json({ success: true, body: { accessToken, user } });
		} catch (error: Error | unknown) {
			next(error);
		}
	}

	@ValidateBody(UserRegistrationDto)
	private async register(req: Request, res: Response, next: NextFunction) {
		try {
			const userInfo = req.body as UserRegistrationDto;
			const user = await this._authService.register(userInfo);
			// const accessToken = this._helper.getAccessToken(user);
			// this._helper.attachRefreshToken(res, user);
			// res.status(200).json({ success: true, body: { accessToken, user } });
		} catch (error) {
			next(error);
		}
	}

	private async logout(
		_req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) {
		try {
			res.cookie('jid', '');
		} catch (error) {
			next(error);
		}
	}

	private async refreshToken(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (req.user) {
				const user = await this._authService.updateTokenVersion(req.user);
			}
		} catch (error) {
			next(error);
		}
	}

	private async revokeToken(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) {}

	public registerRoutes(): void {
		this._router.post('/login', this.login.bind(this));
		this._router.post('/register', this.register.bind(this));
		this._router.post(
			'/logout',
			this._authMiddleware.authenticate,
			this.logout.bind(this),
		);

		// angular , accessToken, refrehsToken
		this._router.post(
			'/refresh-token',
			this._authMiddleware.verifyRefreshToken,
			this.refreshToken.bind(this),
		);

		this._router.post(
			'/revoke-token',
			this._authMiddleware.authenticate,
			this.revokeToken.bind(this),
		);
	}
}
