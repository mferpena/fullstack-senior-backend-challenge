import { CustomError } from '@core/domain/exceptions/CustomError';
import { IExchangeRequestService } from '@usecases/IExchangeRequestService';
import { Request, Response } from 'express';

export class ExchangeController {
    private exchangeRequestService: IExchangeRequestService;

    constructor(exchangeRequestService: IExchangeRequestService) {
        this.exchangeRequestService = exchangeRequestService;
    }

    /**
     * @swagger
     * tags:
     *   name: Exchange
     *   description: Exchange operations
     */

    /**
     * @swagger
     * components:
     *   schemas:
     *     ExchangeRequestData:
     *       type: object
     *       required:
     *         - monedaOrigen
     *         - monedaDestino
     *         - monto
     *       properties:
     *         monedaOrigen:
     *           type: string
     *           description: The source currency
     *         monedaDestino:
     *           type: string
     *           description: The destination currency
     *         monto:
     *           type: number
     *           description: The amount to be exchanged
     *       example:
     *         monedaOrigen: USD
     *         monedaDestino: PEN
     *         monto: 100
     */

    /**
     * @swagger
     * /exchange:
     *   post:
     *     summary: Create a new exchange request
     *     tags: [Exchange]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ExchangeRequestData'
     *     responses:
     *       201:
     *         description: The created exchange request
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ExchangeRequestData'
     *       500:
     *         description: Some server error
     */
    postExchangeRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const newRequest = await this.exchangeRequestService.createExchangeRequest(req.body);
            res.status(201).json(newRequest);
        } catch (error) {
            res.status(500).json({ error: (error as CustomError).message });
        }
    };

    /**
     * @swagger
     * /exchange/history:
     *   get:
     *     summary: Get exchange history
     *     tags: [Exchange]
     *     parameters:
     *       - in: query
     *         name: startDate
     *         schema:
     *           type: string
     *           format: date
     *         required: true
     *         description: The start date of the history
     *       - in: query
     *         name: endDate
     *         schema:
     *           type: string
     *           format: date
     *         required: true
     *         description: The end date of the history
     *     responses:
     *       200:
     *         description: The exchange history
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ExchangeRequestData'
     *       500:
     *         description: Some server error
     */
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
