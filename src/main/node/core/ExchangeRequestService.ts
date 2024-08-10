import { IExchangeRequestRepository } from "./ports/IExchangeRequestRepository";
import { IExchangeRateService } from "./ports/IExchangeRateService";
import { ExchangeRequestData } from "@models/ExchangeRequestData";
import { IExchangeRequestService } from "@usecases/IExchangeRequestService";

export class ExchangeRequestService implements IExchangeRequestService {
    private exchangeRequestRepository: IExchangeRequestRepository;
    private exchangeRateService: IExchangeRateService;

    constructor(
        exchangeRequestRepository: IExchangeRequestRepository,
        exchangeRateService: IExchangeRateService
    ) {
        this.exchangeRequestRepository = exchangeRequestRepository;
        this.exchangeRateService = exchangeRateService;
    }

    async createExchangeRequest(data: ExchangeRequestData): Promise<ExchangeRequestData> {
        const tipoCambio = await this.exchangeRateService.fetchExchangeRate();
        const montoCambiado = data.monto * tipoCambio;
        const newData = { ...data, montoCambiado, tipoCambio, fecha: new Date() };
        const createdRequest = await this.exchangeRequestRepository.save(newData);
        return createdRequest.toObject();
    }

    async getExchangeRequests(startDate: Date, endDate: Date): Promise<ExchangeRequestData[]> {
        const requests = await this.exchangeRequestRepository.find(startDate, endDate);
        return requests.map(request => request.toObject());
    }
}
