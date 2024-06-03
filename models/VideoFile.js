const { Schema, model } = require('mongoose')

const VideoFile = new Schema({
  filename: { type: String, unique: true }
})

module.exports = model('VideoFile', VideoFile)
