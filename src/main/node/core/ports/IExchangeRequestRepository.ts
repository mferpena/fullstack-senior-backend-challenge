import { ExchangeRequestData } from "@models/ExchangeRequestData";
import { ExchangeRequestDocument } from "@infra/secondary/persistence/entities/ExchangeRequestDocument";

export interface IExchangeRequestRepository {
    save(data: ExchangeRequestData): Promise<ExchangeRequestDocument>;
    find(startDate: Date, endDate: Date): Promise<ExchangeRequestDocument[]>;
}
