import Joi from 'joi';

export const createExchangeRequestSchema = Joi.object({
    monedaOrigen: Joi.string()
        .valid('USD', 'EUR', 'GBP')
        .required()
        .messages({
            'string.empty': 'El campo monedaOrigen no puede estar vacío.',
            'any.required': 'El campo monedaOrigen es obligatorio.',
            'any.only': 'El campo monedaOrigen debe ser uno de los siguientes valores: USD, EUR, GBP.'
        }),
    monedaDestino: Joi.string()
        .valid('PEN', 'USD', 'EUR')
        .required()
        .messages({
            'string.empty': 'El campo monedaDestino no puede estar vacío.',
            'any.required': 'El campo monedaDestino es obligatorio.',
            'any.only': 'El campo monedaDestino debe ser uno de los siguientes valores: PEN, USD, EUR.'
        }),
    monto: Joi.number()
        .min(1)
        .max(9999999)
        .precision(2)
        .required()
        .messages({
            'number.base': 'El campo monto debe ser un número.',
            'number.min': 'El campo monto debe ser al menos 1.',
            'number.max': 'El campo monto no debe tener más de 7 dígitos enteros.',
            'number.precision': 'El campo monto no debe tener más de 2 decimales.',
            'any.required': 'El campo monto es obligatorio.'
        })
});

export const getExchangeHistorySchema = Joi.object({
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required()
});