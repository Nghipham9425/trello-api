import express from 'express'
import StatusCodes from 'http-status-codes'
import { boardController } from '~/controllers/boardController'
import { BoardValidation } from '~/validations/BoardValidation'


const Router=express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ Message : 'NOTE: GET API get list Boards ' })
  })
  .post(BoardValidation.createNew, boardController.createNew)

export const boardRoute = Router