import { Schema, model, Document } from 'mongoose';

const exchangeRequestSchema = new Schema({
    monedaOrigen: { type: String, required: true },
    monedaDestino: { type: String, required: true },
    monto: { type: Number, required: true },
    montoCambiado: { type: Number, required: true },
    tipoCambio: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

export interface ExchangeRequestDocument extends Document {
    monedaOrigen: string;
    monedaDestino: string;
    monto: number;
    montoCambiado: number;
    tipoCambio: number;
    fecha: Date;
}

export const ExchangeRequest = model<ExchangeRequestDocument>('ExchangeRequest', exchangeRequestSchema);
