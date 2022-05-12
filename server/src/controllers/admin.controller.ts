import { UserResponseDto } from '@dto/auth.dto';
import { MainService } from '@services/main.service';
import { IRouter, NextFunction, Request, Response, Router } from 'express';
import { IController } from '@interfaces/global';
import { singleton } from 'tsyringe';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { RoleEnum, User } from '@entities/User';
import { AdminService } from '@services/admin.service';

@singleton()
export class AdminController implements IController {
	private readonly _router: IRouter;

	public get router() {
		return this._router;
	}
	constructor(
		private readonly _adminService: AdminService,
		private readonly _authMiddleware: AuthMiddleware,
	) {
		this._router = Router();
		this.initRoutes();
	}

	private async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const usersFromDb = await this._adminService.getUsers();
			const users = usersFromDb.map((u) => new UserResponseDto(u));

			res.status(200).json({ success: true, body: users });
		} catch (error) {
			next(error);
		}
	}

	initRoutes(): void {
		//all these routes needs admin role
		this._router.use(
			this._authMiddleware.authenticate.call(
				this._authMiddleware,
				RoleEnum.ADMIN,
			),
		);

		this._router.get('/users', this.getUsers.bind(this));
	}
}
