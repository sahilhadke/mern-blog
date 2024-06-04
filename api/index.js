import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

// configure dotenv to use .env file
dotenv.config()
const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB')
});

const app = express()

// middleware
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!!!')
})
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
