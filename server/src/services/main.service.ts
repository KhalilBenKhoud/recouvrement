import { User } from '@entities/User';
import { BaseService } from './base.service';

export class MainService extends BaseService {
	findOne<User>(): User {
		throw new Error('Method not implemented.');
	}
}
