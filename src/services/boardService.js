/* eslint-disable no-useless-catch */
//hello
//I'm Developer
import { slugify } from '~/utils/formater'
import { boardModel } from '~/models/boardModel'
import { GET_DB } from '~/config/mongodb'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { columnModel } from '~/models/columnModel'
const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    //goi toi tang model de xu ly luu tru bang ghi newBoard vao trong db
    const createdBoard = await boardModel.createNew(newBoard)
    console.log('CreatedBoard', createdBoard)
    //
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log(getNewBoard)
    //lam them cac logic xu ly logic khac voi collection khac tuy vao dac thu cua du an ....
    // send Email, gui thong bao khi tao board moi chang han

    return getNewBoard
  } catch (error) {
    throw error
  }
}
const getDetails = async (boardId) => {
  try {
    //goi toi tang model de xu ly luu tru bang ghi newBoard vao trong db
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    // //cloneDeep board ra mot cai moi de xu ly , khong anh huong toi board ban dau ,
    // tuy muc dich ve sau ma co can clone hay khong

    const resBoard = cloneDeep(board)
    //dua card ve dung column
    resBoard.columns.forEach((column) => {
      //equals dung duoc vi mongoDB co sp cho objectId
      column.cards = resBoard.cards.filter((card) =>
        card.columnId.equals(column._id)
      )
      //cach nay conver objectId ve String de so sanh
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw error
  }
}
const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)
    return updatedBoard
  } catch (error) {
    throw error
  }
}

const moveCardToDifferentColumn = async (reqBody) => {
  // B1:Cap nhat mnag cardOrderIds cua column ban dau chua no (xoa _id cua card khoi cardOrderIds)
  try {
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updateAt: Date.now()
    })
    // khi di chuyen card sang 1 column khac

    //B2:cap nhat lai mang CardOrderIds cua column tiep theo (Them _id vao mang)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updateAt: Date.now()
    })
    //B3:cap nhat lai column Id cua card keo tha
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'Successfully!' }
  } catch (error) {
    throw new Error(error)
  }
}

export const boardSevices = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
