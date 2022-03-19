import { Connection, ConnectionManager, ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();
const CONNECTION_OPTIONS: ConnectionOptions = {
	type: 'postgres',
	host: process.env.HOST || 'localhost',
	port: parseInt(<string>process.env.POSTGRES_PORT, 10) || 5432,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: 'postgres',
	synchronize: true,
	dropSchema: true,
	entities: ['src/entities/*.ts'],
};

export class Database {
	private static connection: Connection;
	private static connectionManager = new ConnectionManager();

	static async getConnection(): Promise<Connection> {
		if (this.connectionManager.has('default')) {
			return new Promise((resolve, _reject) =>
				resolve(this.connectionManager.get('default'))
			);
		}
		this.connection = await this.connectionManager.create(CONNECTION_OPTIONS);
		await this.connection.connect();
		return this.connection;
	}
}
