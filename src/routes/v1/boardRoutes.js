import express from 'express'
import StatusCodes from 'http-status-codes'


const Router=express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ Message : 'NOTE: GET API get list Boards ' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ Message : 'NOTE: POST API create new board' })
  })

export const boardRoutes = Router