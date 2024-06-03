const errorHandler = require('../utils/errorHandler')

const uploadFile = async (req, res) => {
  try {
    res.json({ file: req.file })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports = {
  uploadFile
}
