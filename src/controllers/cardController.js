import { StatusCodes } from 'http-status-codes'
import { cardServices } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    const createCard = await cardServices.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createCard)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  createNew
}