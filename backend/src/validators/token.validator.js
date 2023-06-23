import Joi from "joi";
import { errorResponse } from "../utils/api.response.js";

export async function tokenValidator(req, res, next) {
  try {
    const schema = Joi.object({
      token: Joi.string().required().max(8).min(8),
      tokenValueDays: Joi.number().required().max(11),
      tokenStatus: Joi.string().valid("USED", "NEW", "EXPIRED").required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return errorResponse(error.message, res);

    return next();
  } catch (ex) {
    return errorResponse(ex.message, res);
  }
}
