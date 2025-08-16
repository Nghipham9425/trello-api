// const express= require('express')

import express from 'express'

const app=express()

const hostname= 'localhost'
const port = 8017

app.get('/', function (req, res)
{
  res.send('<H1>HEllo web <H1/>')
})

app.listen(port, hostname, () => {
  console.log(`Hello Bro i'm running server at http://${hostname}:${port}/`)
})