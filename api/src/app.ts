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

// Create a new sleep record for bedtime
app.post('/api/sleep-record', async (req, res) => {
  try {
    const { bedtime } = req.body
    const sleepRecord = new SleepRecord({ bedtime, wakeupTime: null })
    await sleepRecord.save()
    res.status(201).json({ message: 'Bedtime recorded' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update the wakeup time for the most recent bedtime record
app.post('/api/sleep-record/wake-up', async (req, res) => {
  try {
    const { wakeupTime } = req.body
    const mostRecentRecord = await SleepRecord.findOne({
      wakeupTime: null,
    }).sort({ bedtime: -1 })

    if (!mostRecentRecord) {
      res.status(404).json({ error: 'No open bedtime record found' })
    } else {
      mostRecentRecord.wakeupTime = wakeupTime
      await mostRecentRecord.save()
      res.status(200).json({ message: 'Wake-up time recorded' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
