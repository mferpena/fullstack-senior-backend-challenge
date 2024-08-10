import { ExchangeRequestData } from "@models/ExchangeRequestData";

export interface IExchangeRequestService {
    createExchangeRequest(data: ExchangeRequestData): Promise<ExchangeRequestData>;
    getExchangeRequests(startDate: Date, endDate: Date): Promise<ExchangeRequestData[]>;
}
