const { GridFsStorage } = require('multer-gridfs-storage')
const { url } = require('./db.config')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')

const filesStorage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})

const upload = multer({ storage: filesStorage })

module.exports = upload
