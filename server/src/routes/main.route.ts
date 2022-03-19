import { Router } from 'express';
import { MainController } from '../controllers/MainController';
const router = Router();

router.route('/').get(MainController.findAll);

export { router as mainRouter };
