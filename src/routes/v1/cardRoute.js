import express from 'express'
import StatusCodes from 'http-status-codes'
import { cardController } from '~/controllers/cardController'
import { CardValidation } from '~/validations/CardValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message:'GET: API get list Card' })
  })
  .post(CardValidation.createNew, cardController.createNew)

// Router.route('/:id')
//   .get(cardController.getDetails)
//   .put()

export const cardRoute = Router