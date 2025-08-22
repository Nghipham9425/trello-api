/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })
  exitHook(() => {
    console.log('Disconecting to MongoDB cloud Atlas!')
    CLOSE_DB()
    console.log('Disconected to MongoDB cloud Atlas!')
  })
}

(async () => {
  try {
    console.log('connecting to MongoDB cloud Atlas...')
    await CONNECT_DB()
    console.log('connected to MongoDB cloud Atlas!')

    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => {console.log('Connected to MongoDB cloud Atlas')})
//   .then(() => {START_SERVER()
//   })
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
