export interface IExchangeRateService {
    fetchExchangeRate(): Promise<number>;
}
