const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const authRouter = require('./routes/authRouter')
const fileRouter = require('./routes/filesRouter')
const adminRouter = require('./routes/adminRouter')
const { url, options } = require('./config/db.config')
const Grid = require('gridfs-stream')
require('dotenv').config()

const app = express()
const PORT = process.env.APP_PORT || 8080

app.use(express.json())
app.use('/auth', authRouter)
app.use('/files', fileRouter)
app.use('/admin', adminRouter)
app.use(passport.initialize())
require('./middleware/passport')(passport)

const connection = mongoose.createConnection(url, options)

connection.once('open', () => {
  const gfs = Grid(connection.db, mongoose.mongo)
  gfs.collection('uploads')
})

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started ${PORT}`))
    await mongoose.connect(url, options)
    console.log('MongoDB is connected')
  } catch (e) {
    console.log(e)
  }
}
start()
