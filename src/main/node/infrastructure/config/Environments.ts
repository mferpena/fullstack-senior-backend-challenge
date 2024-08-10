import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['MONGO_URI', 'API_ENDPOINT', 'PORT'];

const validateEnvVars = () => {
    requiredEnvVars.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Missing environment variable: ${variable}`);
        }
    });
};

validateEnvVars();

export class Environments {
    static get mongoUri(): string {
        return process.env.MONGO_URI!;
    }

    static get apiEndpoint(): string {
        return process.env.API_ENDPOINT!;
    }

    static get port(): number {
        return parseInt(process.env.PORT!, 10);
    }
}
