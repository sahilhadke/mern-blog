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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message 
  })
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
