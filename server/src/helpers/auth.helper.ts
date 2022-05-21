import { User } from '@entities/User';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
export class AuthHelper {
	public getAccessToken(user: User): string {
		return this.generateToken(
			user,
			<string>process.env.ACCESS_TOKEN_SECRET,
			'15m',
		);
	}
	public attachRefreshToken(response: Response, user: User): void {
		const refreshToken = this.generateToken(
			user,
			<string>process.env.REFRESH_TOKEN_SECRET,
			'7d',
		);
		response.cookie('jid', refreshToken, {
			httpOnly: true,
			path: '/api/v1/auth/refresh-token',
		});
	}

	private generateToken(user: User, secret: string, expiresIn: string): string {
		return jwt.sign(
			{
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role,
				email: user.email,
				tokenVersion: user.tokenVersion,
			},
			secret,
			{
				expiresIn,
			},
		);
	}
}
