import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { columnController } from '~/controllers/columnController'
import { ColumnValidation } from '~/validations/ColumnValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ Message: 'API Get list column ' })
  })
  .post(ColumnValidation.createNew, columnController.createNew)

export const columnRoute = Router
