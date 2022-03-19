import express from 'express';
import cors, { CorsOptions } from 'cors';
import { Database } from './config/Database';
import { mainRouter } from './routes/main.route';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const options: CorsOptions = {
	origin: ['http://localhost:3000'],
};

const main = async () => {
	try {
		await Database.getConnection();
		console.log(`Connected on Port ${process.env.POSTGRES_PORT}`);
		//Middleware
		app.use(cors(options));
		app.use(express.json());
		app.use('/api/v1', mainRouter);
		app.use(errorHandler);
		//running the app
		app.listen(process.env.PORT, () => {
			console.log(`server listening on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.error(error);
		console.log('Error connecting to the database');
	}
};

main();
