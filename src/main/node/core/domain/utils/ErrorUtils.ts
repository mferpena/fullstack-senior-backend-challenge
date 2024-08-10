import { CustomError } from "../exceptions/CustomError";

export const handleError = (error: any): CustomError => {
    if (error instanceof CustomError) {
        return error;
    } else if (error instanceof Error) {
        return new CustomError(error.message, 500);
    } else {
        return new CustomError('An unknown error occurred', 500);
    }
};
