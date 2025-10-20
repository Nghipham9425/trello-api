import express from 'express'
import { columnController } from '~/controllers/columnController'
import { ColumnValidation } from '~/validations/ColumnValidation'

const Router = express.Router()

Router.route('/')
  .post(ColumnValidation.createNew, columnController.createNew)

Router.route('/:id')
  .put(ColumnValidation.update, columnController.update)

export const columnRoute = Router
