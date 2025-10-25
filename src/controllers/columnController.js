import { async } from '@babel/runtime/helpers/regeneratorRuntime'
import { StatusCodes } from 'http-status-codes'
import { columnSevices } from '~/services/columnService'
const createNew = async (req, res, next) => {
  try {
    const createColumn = await columnSevices.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createColumn)
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {
  try {
    const columnId = req.body.id
    const updatedColumn = await columnSevices.update(columnId, req.body)

    res.status(StatusCodes.OK).json(updatedColumn)
  }
  catch (error)
  {
    next(error)
  }
}
const deleteItem = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const result = await columnSevices.deleteItem(columnId)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew,
  update,
  deleteItem
}