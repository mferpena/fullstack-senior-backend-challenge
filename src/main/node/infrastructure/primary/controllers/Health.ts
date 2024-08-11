import { Request, Response } from 'express';

export class HealthController {
    getHealth = async (req: Request, res: Response): Promise<void> => {
        res.status(200).json({
            message: "ok",
            version: "v0.0.1"
        });
    };
}
