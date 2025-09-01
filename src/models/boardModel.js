import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'


const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title:Joi.string().required().min(3).max(50).trim().strict(),
  slug:Joi.string().required().min(3).trim().strict(),
  description:Joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required(),
  createAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy:Joi.boolean().default(false)
})

const validateBeforeCreated = async (data) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly:false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreated(data)
    const createdBoard= await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
    return createdBoard
  } catch (error) { throw new Error(error) }
}

const findOneById = async (id) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}
//query tong hop aggregate de lay toan bo column va cards thuoc ve Board
const getDetails = async (id) => {
  try {
    // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
    //   _id: new ObjectId(id)
    // })
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match: {
        _id:new ObjectId(id),
        _destroy: false
      } },
      { $lookup: {
        from :columnModel.COLUMN_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $lookup: {
        from :cardModel.CARD_COLLECTION_NAME,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()
    console.log(result)
    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel={
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails
}