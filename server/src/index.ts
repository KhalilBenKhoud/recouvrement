import 'reflect-metadata';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import { Server } from 'http';
import { container } from 'tsyringe';

import { Database } from '@config/database';
import { MainController } from '@controllers/main.controller';
import { AuthController } from '@controllers/auth.controller';
import { errorHandler } from '@middleware/error-handler.middleware';
import { Connection } from 'typeorm';

let server: Server;
const app = express();
const options: CorsOptions = {
	origin: ['http://localhost:3000'],
};

const main = async () => {
	try {
		const cnx = await Database.getConnection();
		// registering the connection instance so we can always access the same connection
		container.registerSingleton;
		container.registerInstance<Connection>(Connection, cnx);
		console.log(`Connected on Port ${process.env.POSTGRES_PORT}`);

		//Global middlewares
		app.use([express.json(), cors(options)]);

		//Routes
		// app.use('/api/v1', container.resolve(MainController).router);
		app.use('/api/v1/auth', container.resolve(AuthController).router);
		app.use(errorHandler);

		//running the app
		server = app.listen(8080, () => {
			console.log(`server listening on port ${process.env.PORT}`);
		});

		process.on('SIGTERM', shutDown);
		process.on('SIGINT', shutDown);
	} catch (error) {
		shutDown();
		console.error(error);
		console.log('Error connecting to the database');
	}
};

main();

function shutDown() {
	console.log('Received kill signal, shutting down gracefully');
	server?.close(() => {
		console.log('Closed out remaining connections');
		process.exit(0);
	});

	setTimeout(() => {
		console.error(
			'Could not close connections in time, forcefully shutting down',
		);
		process.exit(1);
	}, 10000);
}

/* 
container.register<ConnectionManager>(ConnectionManager, { useFactory: instanceCachingFactory(() => new ConnectionManager()) });
// configure TypeORM to use a dependency injection container
useContainer(
  // wrapper because TypeORM expects `get` function from IoC container
  { get: someClass => container.resolve(someClass as any) },
);
 */
