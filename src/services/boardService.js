/* eslint-disable no-useless-catch */
//hello
//I'm Developer
import { slugify } from '~/utils/formater'
import { boardModel } from '~/models/boardModel'
import { GET_DB } from '~/config/mongodb'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
const createNew = async( reqBody ) => {
  try {
    const newBoard = {
      ...reqBody,
      slug:slugify(reqBody.title)
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
const getDetails = async( boardId ) => {
  try {

    //goi toi tang model de xu ly luu tru bang ghi newBoard vao trong db
    const board = await boardModel.getDetails(boardId)

    if (!board)
    {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    // //cloneDeep board ra mot cai moi de xu ly , khong anh huong toi board ban dau ,
    // tuy muc dich ve sau ma co can clone hay khong

    const resBoard = cloneDeep(board)
    //dua card ve dung column
    resBoard.columns.forEach(column => {
      //equals dung duoc vi mongoDB co sp cho objectId
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      //cach nay conver objectId ve String de so sanh
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw error
  }
}
export const boardSevices = {
  createNew,
  getDetails
}