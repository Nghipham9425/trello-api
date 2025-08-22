// /**
//  * Updated by trungquandev.com's author on August 17 2023
//  * YouTube: https://youtube.com/@trungquandev
//  * "A bit of fragrance clings to the hand that gives flowers!"
//  */

import { env } from './environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

//khởi tạo một đối tuong trelloDatabaseInstance ban đầu là null (Vì chúng ta chưa connect)
let trelloDatabaseInstance = null

//khoi tao doi tuong mongoClientInstance de connect toi mongoDB
const MongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi : {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//connect to mongoDB
export const CONNECT_DB = async () => {
  await MongoClientInstance.connect()
  trelloDatabaseInstance=MongoClientInstance.db(env.DATABASE_NAME)
}

//chi goi get_DB sau khi da connect thanh cong toi mongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await MongoClientInstance.close()
}