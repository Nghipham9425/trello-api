import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/apiError'
const createNew = async (req, res, next) =>{

  try {
    // console.log('reg.body', req.body)
    // console.log('reg.query', req.query)
    // console.log('reg.params', req.params)
    // console.log('reg.files', req.files)
    // console.log('reg.cookies', req.cookies)
    // console.log('reg.jwtDecoded', req.jwtDecoded)

    res.status(StatusCodes.CREATED).json({
      Message : 'POST FORM Controller:API create new board' })
  } catch (error) {
    next(error)
    // res.StatusCodes(StatusCodes.INTERNAL_SERVER_ERROR).json(
    //   {
    //     errors: error.message
    //   }
    // )
  }
}

export const boardController = {
  createNew
}