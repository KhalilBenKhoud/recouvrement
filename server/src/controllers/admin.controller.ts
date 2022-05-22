import { UserResponseDto } from '@dto/auth.dto';
import { IRouter, NextFunction, Request, Response, Router } from 'express';
import { IController } from '@interfaces/global';
import { singleton } from 'tsyringe';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { RoleEnum, User } from '@entities/User';
import { AdminService } from '@services/admin.service';
import { Invoice } from '@entities/Invoice';

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
			const page = req.query.page ?? 1;
			const usersFromDb = await this._adminService.getUsers(+page);
			const users = usersFromDb.map((u) => new UserResponseDto(u));

			res.status(200).json({ success: true, body: users });
		} catch (error) {
			next(error);
		}
	}

	private async addInvoice(req: Request, res: Response, next: NextFunction) {
		try {
			const input = req.body as Partial<Invoice>;
			const invoice = await this._adminService.addInvoice(input);

			res.status(201).json({ success: true, body: invoice });
		} catch (error) {
			next(error);
		}
	}
	private async getInvoices(req: Request, res: Response, next: NextFunction) {
		try {
			const { page = 1, status, category, dateRange } = req.query;
			const invoice = await this._adminService.getInvoices(+page);

			res.status(201).json({ success: true, body: invoice });
		} catch (error) {
			next(error);
		}
	}

	private async getComplaints(
		req: Request,
		res: Response,
		next: NextFunction,
	) {}

	initRoutes(): void {
		//all these routes needs admin role
		this._router.use(
			this._authMiddleware.authenticate.call(
				this._authMiddleware,
				RoleEnum.ADMIN,
			),
		);

		this._router.get('/users', this.getUsers.bind(this));
		this._router.get('/invoices/:userId', this.getInvoices.bind(this));
		this._router
			.route('/invoices')
			.get(this.getInvoices.bind(this))
			.post(this.addInvoice.bind(this));
	}
}
