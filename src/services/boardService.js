/* eslint-disable no-useless-catch */
//hello
//I'm Developer
import { slugify } from '~/utils/formater'
const createNew = async( reqBody ) => {
  try {
    const newBoard = {
      ...reqBody,
      slug:slugify(reqBody.title)
    }
    //goi toi tang model de xu ly luu tru bang ghi newBoard vao trong db
    //...

    //lam them cac logic xu ly logic khac voi collection khac tuy vao dac thu cua du an ....
    // send Email, gui thong bao khi tao board moi chang han

    return newBoard
  } catch (error) {
    throw error
  }
}
export const boardSevices = {
  createNew
}