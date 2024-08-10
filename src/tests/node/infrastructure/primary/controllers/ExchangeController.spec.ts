import { CustomError } from '@core/domain/exceptions/CustomError';
import { IExchangeRequestService } from '@usecases/IExchangeRequestService';
import { Request, Response } from 'express';

export class ExchangeController {
    private exchangeRequestService: IExchangeRequestService;

    constructor(exchangeRequestService: IExchangeRequestService) {
        this.exchangeRequestService = exchangeRequestService;
    }

    postExchangeRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const newRequest = await this.exchangeRequestService.createExchangeRequest(req.body);
            res.status(201).json(newRequest);
        } catch (error) {
            res.status(500).json({ error: (error as CustomError).message });
        }
    };

    getExchangeHistory = async (req: Request, res: Response): Promise<void> => {
        try {
            const { startDate, endDate } = req.query;
            const requests = await this.exchangeRequestService.getExchangeRequests(
                new Date(startDate as string),
                new Date(endDate as string)
            );
            res.status(200).json(requests);
        } catch (error) {
            res.status(500).json({ error: (error as CustomError).message });
        }
    };
}
