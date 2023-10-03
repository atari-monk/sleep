import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/sleep', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)

// Define a schema for sleep records
const sleepRecordSchema = new mongoose.Schema({
  bedtime: String,
  wakeupTime: String,
})

const SleepRecord = mongoose.model('SleepRecord', sleepRecordSchema)

// Middleware for parsing JSON requests
app.use(bodyParser.json())

// Create a new sleep record
app.post('/api/sleep-record', async (req, res) => {
  try {
    const { bedtime, wakeupTime } = req.body
    const sleepRecord = new SleepRecord({ bedtime, wakeupTime })
    await sleepRecord.save()
    res.status(201).json({ message: 'Sleep record created' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
