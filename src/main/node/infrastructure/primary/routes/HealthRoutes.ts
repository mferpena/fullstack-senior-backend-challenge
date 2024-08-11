import { Router, Express } from 'express';
import { validateQueryParams, validateSchema } from '../middleware/ValidationMiddleware';
import { createExchangeRequestSchema, getExchangeHistorySchema } from '../controllers/dtos/ExchangeDto';
import { HealthController } from '../controllers/Health';

const router = Router();

export function healthRoutes(app: Express, controller: HealthController) {
    router.post('/health', validateSchema(createExchangeRequestSchema), controller.getHealth);

    app.use('/api', router);
}
