const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters.",
    "string.empty": "Password is required.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "string.empty": "Confirm Password is required.",
  }),
  firstName: Joi.string().required().messages({
    "string.empty": "First Name is required.",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last Name is required.",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "Gender must be 'male', 'female', or 'other'.",
    "string.empty": "Gender is required.",
  }),
  birthDate: Joi.date().iso().required().messages({
    "date.format": "Birth Date must be a valid ISO date.",
    "string.empty": "Birth Date is required.",
  }),
});

module.exports = registerSchema;
