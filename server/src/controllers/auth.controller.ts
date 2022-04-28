import { IRouter, NextFunction, Request, Response, Router } from 'express';
import { singleton } from 'tsyringe';
import { AuthService } from '@services/auth.service';
import { IController } from '@interfaces/global';
import {
	RequestWithUser,
	UserLoginDto,
	UserRegistrationDto,
	UserResponseDto,
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
		this.initRoutes();
	}

	@ValidateBody(UserLoginDto)
	private async login(req: Request, res: Response, next: NextFunction) {
		try {
			const userInput = req.body as UserLoginDto;
			const user = await this._authService.login(userInput);
			const accessToken = this._helper.getAccessToken(user);
			this._helper.attachRefreshToken(res, user);
			res.status(200).json({
				success: true,
				body: { accessToken, user: new UserResponseDto(user) },
			});
		} catch (error: Error | unknown) {
			next(error);
		}
	}

	@ValidateBody(UserRegistrationDto)
	private async register(req: Request, res: Response, next: NextFunction) {
		try {
			const userInfo = req.body as UserRegistrationDto;
			const user = await this._authService.register(userInfo);
			const accessToken = this._helper.getAccessToken(user);
			this._helper.attachRefreshToken(res, user);
			res.status(200).json({
				success: true,
				body: {
					accessToken,
					user: {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						cin: user.cin,
						role: user.role,
					},
				},
			});
		} catch (error) {
			next(error);
		}
	}

	private async logout(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) {
		try {
			req.user && (await this._authService.updateTokenVersion(req.user));
			res.cookie('jid', '');
			res.status(204).json({ success: true });
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

	public initRoutes(): void {
		this._router.post('/login', this.login.bind(this));
		this._router.post('/register', this.register.bind(this));
		this._router.post(
			'/logout',
			this._authMiddleware.authenticate.bind(this._authMiddleware),
			this.logout.bind(this),
		);

		// angular , accessToken, refrehsToken
		this._router.post(
			'/refresh-token',
			this._authMiddleware.verifyRefreshToken.bind(this._authMiddleware),
			this.refreshToken.bind(this),
		);

		this._router.post(
			'/revoke-token',
			this._authMiddleware.authenticate.bind(this._authMiddleware),
			this.revokeToken.bind(this),
		);
	}
}
