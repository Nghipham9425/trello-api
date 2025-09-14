//hello
//I'm Developer
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

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

export const columnSevices = {
  createNew,
  update
}