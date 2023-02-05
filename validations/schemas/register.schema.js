const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required().min(5),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(3).required(),
    address: Joi.string().optional().allow(''),
    phone: Joi.string().optional().allow('')
}).required();

module.exports = {registerSchema};