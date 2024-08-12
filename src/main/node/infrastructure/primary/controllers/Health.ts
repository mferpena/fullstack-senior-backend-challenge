import { Request, Response } from 'express';
import { Logger } from '@infra/config/Logger';

const logger = new Logger('HealthController');

export class HealthController {
    getHealth = async (req: Request, res: Response): Promise<void> => {
        logger.info('Health check requested');
        res.status(200).json({
            message: "ok",
            version: "v0.0.5"
        });
    };
}
