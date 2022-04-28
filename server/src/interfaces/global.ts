import { IRouter } from 'express';

export interface IController {
	router: IRouter;
	initRoutes(): void;
}
