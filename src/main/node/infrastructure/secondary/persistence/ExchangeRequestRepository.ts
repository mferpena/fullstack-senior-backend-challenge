import { IExchangeRequestRepository } from "@core/ports/IExchangeRequestRepository";
import { ExchangeRequestData } from "@models/ExchangeRequestData";
import { ExchangeRequest, ExchangeRequestDocument } from "@infra/secondary/persistence/entities/ExchangeRequestDocument";

export class ExchangeRequestRepository implements IExchangeRequestRepository {
    async save(data: ExchangeRequestData): Promise<ExchangeRequestDocument> {
        const newRequest = new ExchangeRequest(data);
        return await newRequest.save();
    }

    async find(startDate: Date, endDate: Date): Promise<ExchangeRequestDocument[]> {
        return await ExchangeRequest.find({
            fecha: {
                $gte: startDate,
                $lte: endDate
            }
        });
    }
}
