//hello
//I'm Developer
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async( reqBody ) => {
  try {
    const newColumn = {
      ...reqBody
    }
    //goi toi tang model de xu ly luu tru bang ghi newBoard vao trong db
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn)
    {
      //xu ly cau truc data truoc khi tra ve
      getNewColumn.cards = []
    }
    //cap nhat mnang ColumnOrderIds tronc collection boards

    await boardModel.pushColumnOrderIds(getNewColumn)
    return getNewColumn
  } catch (error) {
    throw error
  }
}

const update = async( columnId, reqBody ) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt:Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    return updatedColumn
  } catch (error) {
    throw error
  }
}
const deleteItem = async( columnId ) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)
    if (!targetColumn)
    {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
    }

    //delete col
    await columnModel.deleteOneById(columnId)
    //delete card
    await cardModel.deleteManyByColumnId(columnId)
    //xoa columnId trong mang columnOrderIds cua cai board chua no
    await columnModel.pullCardOrderIds(targetColumn)

    return { deleteResult:'Columns and its Cards deleted succesfully!' }

  } catch (error) {
    throw error
  }
}

export const columnSevices = {
  createNew,
  update,
  deleteItem
}