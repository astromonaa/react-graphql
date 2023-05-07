const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const db = 'mongodb+srv://astromonaa:todos321@cluster0.i2j4zov.mongodb.net/graphql?retryWrites=true&w=majority'

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8000

mongoose.connect(db)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

const dbConnection = mongoose.connection;
dbConnection.on('error', e => console.log('Connection error:', e))
dbConnection.once('open', () => console.log('Connection success'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server Started');
})