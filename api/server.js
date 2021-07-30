const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const ownerRouter = require('./owners/owner-router');
const userRouter = require('./users/user-router');
const authRouter = require('./auth/auth-router');




const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/owners', ownerRouter);
server.use('/api/user', userRouter);
server.use('/api/auth', authRouter);


server.get('/', (req, res)=> {
  res.send(`<h1>Welcome to African Marketplace API</h1>`)
})
//ERROR HANDLER
server.use((err, req, res, next) => {//eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = server
