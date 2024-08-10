import { ExchangeRequestData } from "@core/domain/models/ExchangeRequestData";
import { ExchangeRequestService } from "@core/ExchangeRequestService";
import { IExchangeRateService } from "@core/ports/IExchangeRateService";
import { IExchangeRequestRepository } from "@core/ports/IExchangeRequestRepository";

describe('ExchangeRequestService', () => {
    let exchangeRequestRepository: IExchangeRequestRepository;
    let exchangeRateService: IExchangeRateService;
    let exchangeRequestService: ExchangeRequestService;

    beforeEach(() => {
        exchangeRequestRepository = {
            save: jest.fn(),
            find: jest.fn(),
        } as any;

        exchangeRateService = {
            fetchExchangeRate: jest.fn().mockResolvedValue(3.5),
        };

        exchangeRequestService = new ExchangeRequestService(exchangeRequestRepository, exchangeRateService);
    });

    it('should create a new exchange request', async () => {
        const requestData: ExchangeRequestData = {
            monto: 100,
            monedaOrigen: "USD",
            monedaDestino: "EUR"
        };
        const savedData = { ...requestData, montoCambiado: 350, tipoCambio: 3.5, fecha: new Date() };

        (exchangeRequestRepository.save as jest.Mock).mockResolvedValue({
            toObject: jest.fn().mockReturnValue(savedData),
        });

        const result = await exchangeRequestService.createExchangeRequest(requestData);

        expect(exchangeRateService.fetchExchangeRate).toHaveBeenCalled();
        expect(exchangeRequestRepository.save).toHaveBeenCalledWith(savedData);
        expect(result).toEqual(savedData);
    });
});
