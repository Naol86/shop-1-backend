import Joi from "joi";

export const createSubCategorySchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "Category ID must be a number.",
    "number.empty": "Category ID is required.",
  }),
  name: Joi.string().min(3).max(255).required().messages({
    "string.empty": "Category name is required.",
    "string.min": "Category name must be at least 3 characters.",
    "string.max": "Category name must not exceed 255 characters.",
  }),

  description: Joi.string().min(5).max(1000).optional().messages({
    "string.min": "Description must be at least 5 characters.",
    "string.max": "Description must not exceed 1000 characters.",
  }),
  image: Joi.string().uri().optional().messages({
    "string.uri": "Image must be a valid URL.",
  }),
});
