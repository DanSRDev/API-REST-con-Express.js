const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const phone = Joi.number();

const createUserSchema = Joi.object({
  name: name.required(),
  phone: phone.required()
});

const updateUserSchema = Joi.object({
  name: name,
  phone: phone
})

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };