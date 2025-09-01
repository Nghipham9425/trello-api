import Joi from "joi"
import { StatusCodes } from "http-status-codes"
import ApiError from '~/utils/apiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title:Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required':'Title is required',
      'string.empty':'Title is not allowed to be empty',
      'string.min':'Title must be lowest 3 char',
      'string.max':'Title max 50 chars',
      'string.trim':'Title must not have leading or trailing whitespace'
    }),
    description:Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })
  try {
    console.log(req.body)
    await correctCondition.validateAsync(req.body, { abortEarly:false })
    next()
    //Next o đây dùng để nếu validate hợp lệ thì cho request tới nơi tiếp theo như Controller ...
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const BoardValidation = {
  createNew
}