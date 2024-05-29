import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})

app.get('/', (req, res) => {
    mongoose.connect(process.env.MONGO).then( () => {
      console.log('Connected to MongoDB')
    }).catch( (err) => {
      console.log(err)
    })
    res.send('Hello World!!!')
})