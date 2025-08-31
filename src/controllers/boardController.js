import { StatusCodes } from 'http-status-codes'
import { boardSevices } from '~/services/boardService'

const createNew = async (req, res, next) => {

  try {
    // console.log('reg.body', req.body)
    // console.log('reg.query', req.query)
    // console.log('reg.params', req.params)
    // console.log('reg.files', req.files)
    // console.log('reg.cookies', req.cookies)
    // console.log('reg.jwtDecoded', req.jwtDecoded)

    const createdBoard = await boardSevices.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    next(error)
    // res.StatusCodes(StatusCodes.INTERNAL_SERVER_ERROR).json(
    //   {
    //     errors: error.message
    //   }
    // )
  }
}

const getDetails = async (req, res, next) => {

  try {
    //id ben route
    const boardId = req.params.id
    // console.log('reg.params', req.params)


    const Board = await boardSevices.getDetails(boardId)

    res.status(StatusCodes.CREATED).json(Board)
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
  createNew,
  getDetails
}