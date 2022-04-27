import { RequestWithUser } from '@dto/auth.dto';
import { RoleEnum, User } from '@entities/User';
import { ErrorResponse } from '@utils/error-response.util';
import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { delay, inject, injectable } from 'tsyringe';
import { Connection, Repository } from 'typeorm';

@injectable()
export class AuthMiddleware {
	private readonly _userRepo: Repository<User>;
	constructor(@inject(delay(() => Connection)) _connection: Connection) {
		this._userRepo = _connection.getRepository(User);
	}
	async verifyRefreshToken(
		req: RequestWithUser,
		_res: Response,
		next: NextFunction,
	) {
		try {
			const refreshToken = req.cookies?.jid;
			if (!refreshToken) {
				throw ErrorResponse.notAuthorized();
			}
			const payload = jwt.verify(
				refreshToken,
				<string>process.env.REFRESH_TOKEN_KEY,
			) as jwt.JwtPayload;

			const user = await this._userRepo.findOne(payload?.id);
			if (!user) {
				throw ErrorResponse.notAuthorized();
			}
			req.user = user;
			next();
		} catch (error) {
			next(error);
		}
	}

	async authenticate(req: RequestWithUser, _res: Response, next: NextFunction) {
		try {
			const authHeader = req.headers['Authorization'];
			if (!authHeader) {
				ErrorResponse.notAuthorized();
			}
			const [accessToken] = (<string>authHeader).split('Bearer ');
			const payload = jwt.verify(
				accessToken,
				<string>process.env.ACCESS_TOKEN_SECRET,
			) as JwtPayload;

			const user = await this._userRepo.findOne(payload?.id);
			if (!user) {
				throw ErrorResponse.notAuthorized();
			}
			req.user = user;

			next();
		} catch (error) {
			next(error);
		}
	}
}
