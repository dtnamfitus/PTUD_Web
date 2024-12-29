const Joi = require("joi");

const changePasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "New Password must be at least 6 characters.",
    "string.empty": "New Password is required.",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Passwords do not match.",
      "string.empty": "Confirm Password is required.",
    }),
});

module.exports = changePasswordSchema;
