import { InvoiceFiltersQuery } from './../dto/invoice.dto';
import { RequestWithUser } from './../dto/auth.dto';
import {
	ComplaintResponseDto,
	CreateComplaintDto,
} from './../dto/complaint.dto';
import { IRouter, NextFunction, Response, Router } from 'express';
import { IController } from '@interfaces/global';
import { singleton } from 'tsyringe';
import { AuthMiddleware } from '@middleware/auth.middleware';
import { RoleEnum, User } from '@entities/User';
import { ClientService } from './../services/client.service';
import { ValidateBody, ValidateQuery } from '@validators/request.validator';

@singleton()
export class ClientController implements IController {
	private readonly _router: IRouter;

	public get router() {
		return this._router;
	}
	constructor(
		private readonly _clientService: ClientService,
		private readonly _authMiddleware: AuthMiddleware,
	) {
		this._router = Router();
		this.initRoutes();
	}

	@ValidateQuery(InvoiceFiltersQuery)
	private async getInvoices(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) {
		try {
			const query = req.query as InvoiceFiltersQuery;
			const page = +req.params.page_number ?? 0;
			const user = req.user!;

			const invoices = await this._clientService.getInvoices(
				user.id,
				page,
				query ?? null,
			);

			res.status(200).json({ success: true, body: invoices });
		} catch (error) {
			next(error);
		}
	}

	@ValidateBody(CreateComplaintDto)
	private async addComplaint(
		req: RequestWithUser,
		res: Response,
		next: NextFunction,
	) {
		try {
			const payload = req.body as CreateComplaintDto;
			const user = req.user as User;
			const complaint = await this._clientService.createComplaint(
				user,
				payload,
			);
			res
				.status(201)
				.json({ success: true, body: new ComplaintResponseDto(complaint) });
		} catch (error) {
			next(error);
		}
	}

	initRoutes(): void {
		//all these routes needs admin role
		this._router.use(
			this._authMiddleware.authenticate.call(
				this._authMiddleware,
				RoleEnum.CLIENT,
			),
		);
		this._router.get('/invoices/:page_number', this.getInvoices.bind(this));
		this._router.post('/complaint', this.addComplaint.bind(this));
	}
}
