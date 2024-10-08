import cors from 'cors';
import express from 'express';
import { setupSwagger } from '@infra/config/SwaggerConfig';
import { Environments } from '@infra/config/Environments';
import { Logger } from '@infra/config/Logger';
import { ExchangeRequestService } from '@core/ExchangeRequestService';
import { connectToDatabase } from '@infra/secondary/persistence/config/ConnectToDatabase';
import { ExchangeRequestRepository } from '@infra/secondary/persistence/ExchangeRequestRepository';
import { ExchangeRateService } from '@infra/secondary/apiclients/ExchangeRateService';
import { ExchangeController } from '@infra/primary/controllers/ExchangeController';
import { exchangeRoutes } from '@infra/primary/routes/ExchangeRoutes';
import { HealthController } from '@infra/primary/controllers/Health';
import { healthRoutes } from '@infra/primary/routes/HealthRoutes';

const logger = new Logger('App');

const createApp = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    return app;
};

const startServer = async () => {
    try {
        const app = createApp();
        setupSwagger(app);
        await connectToDatabase();

        const exchangeRequestRepository = new ExchangeRequestRepository();
        const exchangeRateService = new ExchangeRateService();
        const exchangeRequestService = new ExchangeRequestService(exchangeRequestRepository, exchangeRateService);
        const exchangeController = new ExchangeController(exchangeRequestService);

        const healthController = new HealthController();

        exchangeRoutes(app, exchangeController);
        healthRoutes(app, healthController);

        const port = Environments.port;
        app.listen(port, () => {
            logger.info(`Server running on port ${port}`);
        });
    } catch (error: any) {
        logger.error('Error starting the server: {error}', error);
        process.exit(1);
    }
};

startServer();