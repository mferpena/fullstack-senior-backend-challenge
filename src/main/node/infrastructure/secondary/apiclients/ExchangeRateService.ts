import { handleError } from "@core/domain/utils/ErrorUtils";
import { IExchangeRateService } from "@core/ports/IExchangeRateService";
import { Environments } from "@infra/config/Environments";
import axios from "axios";

export class ExchangeRateService implements IExchangeRateService {
    async fetchExchangeRate(): Promise<number> {
        try {
            const response = await axios.get(Environments.apiEndpoint);
            return response.data.venta;
        } catch (error) {
            throw handleError(error);
        }
    }
}
