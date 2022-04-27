import { UserLoginDto, UserRegistrationDto } from '@dto/auth.dto';
import { User } from '@entities/User';
import { ErrorResponse } from '@utils/error-response.util';
import bcrypt from 'bcrypt';
import { delay, inject, injectable } from 'tsyringe';
import { Connection, Repository } from 'typeorm';

@injectable()
export class AuthService {
	private _userRepository: Repository<User>;
	constructor(@inject(delay(() => Connection)) _connection: Connection) {
		this._userRepository = _connection.getRepository(User);
	}
	public async login(userInput: UserLoginDto): Promise<User> {
		const user = await this._userRepository.findOne({ cin: +userInput.cin });
		if (!user) {
			throw ErrorResponse.notAuthorized('Wrong credentials!');
		}
		const didPasswordMatch = await bcrypt.compare(
			userInput.password,
			user.password,
		);
		if (!didPasswordMatch) {
			throw ErrorResponse.notAuthorized('Wrong credentials!');
		}
		return user;
	}
	public async register(userInput: UserRegistrationDto) {
		const user = await this._userRepository.findOne({ cin: userInput.cin });
		if (user) {
			throw ErrorResponse.duplicateEntry();
		}
		return this._userRepository.insert(userInput);
	}

	async updateTokenVersion(user: User) {
		return user;
	}
}
