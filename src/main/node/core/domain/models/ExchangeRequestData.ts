export type ExchangeRequestData = {
    monedaOrigen: string;
    monedaDestino: string;
    monto: number;
    montoCambiado?: number;
    tipoCambio?: number;
    fecha?: Date;
};