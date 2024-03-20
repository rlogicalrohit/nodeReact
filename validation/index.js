const Joi = require('joi');

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    itemWeight: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string(),
    image: Joi.string()
});

const updateProductSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    itemWeight: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string(),
    image: Joi.string()

});

const userRegistrationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({ 'any.only': '{{#label}} does not match Password' })
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


module.exports = { createProductSchema, updateProductSchema, userRegistrationSchema, userLoginSchema }