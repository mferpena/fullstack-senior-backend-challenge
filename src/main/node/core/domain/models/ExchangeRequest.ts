import { Schema, model } from 'mongoose';

const exchangeRequestSchema = new Schema({
    monedaOrigen: { type: String, required: true },
    monedaDestino: { type: String, required: true },
    monto: { type: Number, required: true },
    montoCambiado: { type: Number, required: true },
    tipoCambio: { type: Number, required: true },
    fecha: { type: Date, default: Date.now }
});

export const ExchangeRequest = model('ExchangeRequest', exchangeRequestSchema);
