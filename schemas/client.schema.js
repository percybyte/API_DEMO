import Joi from 'joi';

const clientSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'The name is required',
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'The last name is required',
  }),
  email: Joi.string().trim().email().required().messages({
    'any.required': 'The email is required',
    'string.empty': 'The email cannot be empty',
    'string.email': 'The email must be in a valid format',
  }),
  password: Joi.string().trim().min(6).required(),
  phone: Joi.number().allow(null, ''),
  isActive: Joi.boolean().default(true),
});

const getOneClientSchema = Joi.object({
  id: Joi.string()
    .trim()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'The ID must be a valid ObjectId',
      'any.required': 'The ID is required',
    }),
});

const updateClientSchema = Joi.object({
  name: Joi.string().trim().optional().messages({
    'string.empty': 'Name cannot be empty',
  }),
  lastName: Joi.string().trim().optional().messages({
    'string.empty': 'Last name cannot be empty',
  }),
  email: Joi.string().trim().email().optional().messages({
    'string.email': 'Email must have a valid format',
  }),
  password: Joi.string().trim().min(6).optional().messages({
    'string.min': 'Password must be at least 6 characters long',
  }),
  phone: Joi.number().optional().allow(null, '').messages({
    'number.base': 'Phone must be a valid number',
  }),
});

export { clientSchema, getOneClientSchema, updateClientSchema };
