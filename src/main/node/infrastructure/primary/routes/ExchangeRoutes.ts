import { Router, Express } from 'express';
import { ExchangeController } from '@infra/primary/controllers/ExchangeController';
import { validateQueryParams, validateSchema } from '../middleware/ValidationMiddleware';
import { createExchangeRequestSchema, getExchangeHistorySchema } from '../controllers/dtos/ExchangeDto';

const router = Router();

export function exchangeRoutes(app: Express, controller: ExchangeController) {
    router.post('/exchange', validateSchema(createExchangeRequestSchema), controller.postExchangeRequest);
    router.get('/exchange-history', validateQueryParams(getExchangeHistorySchema), controller.getExchangeHistory);

    app.use('/api', router);
}
