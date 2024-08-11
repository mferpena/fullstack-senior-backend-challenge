import { Router, Express } from 'express';
import { HealthController } from '../controllers/Health';

const router = Router();

export function healthRoutes(app: Express, controller: HealthController) {
    router.get('/health', controller.getHealth);

    app.use('/api', router);
}
