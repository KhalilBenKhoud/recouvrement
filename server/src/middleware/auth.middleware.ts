import { RequestWithUser } from '@dto/auth.dto';
import { RoleEnum, User } from '@entities/User';
import { ErrorResponse } from '@utils/error-response.util';
import { AsyncRequestHandler } from '@validators/request.validator';
import { NextFunction, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { Connection, Repository } from 'typeorm';

@injectable()
export class AuthMiddleware {
	private readonly _userRepo: Repository<User>;
	constructor(_connection: Connection) {
		this._userRepo = _connection.getRepository(User);
	}
	async verifyRefreshToken(
		req: RequestWithUser,
		_res: Response,
		next: NextFunction,
	) {
		console.log('trying to refresh token');
		try {
			const refreshToken = req.cookies?.jid;
			if (!refreshToken) {
				throw ErrorResponse.notAuthorized();
			}
			const payload = jwt.verify(
				refreshToken,
				<string>process.env.REFRESH_TOKEN_SECRET,
			) as jwt.JwtPayload;

			const user = await this._userRepo.findOne({
				id: payload?.id,
				tokenVersion: payload?.tokenVersion,
			});
			if (!user) {
				throw ErrorResponse.notAuthorized();
			}
			req.user = user;
			next();
		} catch (error) {
			next(error);
		}
	}

	authenticate(role?: RoleEnum) {
		return async (req: RequestWithUser, _res: Response, next: NextFunction) => {
			try {
				const authHeader = req.headers.authorization;
				console.log(authHeader);
				if (!authHeader) {
					throw ErrorResponse.notAuthorized();
				}
				const [_, accessToken] = (<string>authHeader).split('Bearer ');
				const payload = jwt.verify(
					accessToken,
					<string>process.env.ACCESS_TOKEN_SECRET,
				) as JwtPayload;

				const user = await this._userRepo.findOne({
					id: payload?.id,
					tokenVersion: payload?.tokenVersion,
				});
				if (!user) {
					throw ErrorResponse.notAuthorized();
				}
				if (typeof role === 'number' && user.role !== role) {
					throw ErrorResponse.forbidden();
				}
				req.user = user;

				next();
			} catch (error) {
				next(error);
			}
		};
	}
}
