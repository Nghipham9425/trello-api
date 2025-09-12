//hello
//I'm Developer
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
const createNew = async( reqBody ) => {
  try {
    const newCard = {
      ...reqBody
    }
    //goi toi tang model de xu ly luu tru bang ghi newBoard vao trong db
    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard)
    {
      await columnModel.pushCardOrderIds(getNewCard)
    }
    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardServices = {
  createNew
}