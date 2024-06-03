const {
  DB_DATABASE,
  CLUSTER,
  DB_USERNAME,
  DB_PASSWORD
} = process.env

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000
}

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER}.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`

module.exports = {
  url: url,
  options: options
}
