import { Connection, ConnectionManager, ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const CONNECTION_OPTIONS: ConnectionOptions = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: +(<string>process.env.POSTGRES_PORT) ?? 5432,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: true,
	// dropSchema: true,
	entities: ['src/entities/*.ts'],
};

export class Database {
	static connection: Connection;
	private static connectionManager = new ConnectionManager();

	static async getConnection(): Promise<Connection> {
		if (this.connectionManager.has('default')) {
			this.connection = this.connectionManager.get('default');
		} else {
			this.connection = await this.connectionManager
				.create(CONNECTION_OPTIONS)
				.connect();
		}
		return this.connection;
	}
}
