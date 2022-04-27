import { IRouter } from 'express';

export interface IController {
	router: IRouter;
	registerRoutes(): void;
}
