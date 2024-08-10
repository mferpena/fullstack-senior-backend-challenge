import mongoose from 'mongoose';
import { Environments } from '@infra/config/Environments';
import { Logger } from '@infra/config/Logger';

const logger = new Logger('ConnectToDatabase');

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(Environments.mongoUri);
        logger.info(`Connected to MongoDB`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
