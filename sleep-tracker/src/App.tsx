import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [bedtime, setBedtime] = useState<string | null>(null)
  const [wakeupTime, setWakeupTime] = useState<string | null>(null)

  const handleGoToBed = async () => {
    const currentDateTime = new Date().toLocaleString()
    setBedtime(currentDateTime)

    try {
      // Send the bedtime to the server
      await axios.post('http://localhost:3000/api/sleep-record', {
        bedtime: currentDateTime,
      })
      alert('Bedtime recorded successfully!')
    } catch (error) {
      console.error('Error recording bedtime:', error)
    }
  }

  const handleWakeUp = async () => {
    const currentDateTime = new Date().toLocaleString()
    setWakeupTime(currentDateTime)

    try {
      // Send the wakeupTime to the server
      await axios.post('http://localhost:3000/api/sleep-record/wake-up', {
        wakeupTime: currentDateTime,
      })
      alert('Wake-up time recorded successfully!')
    } catch (error) {
      console.error('Error recording wake-up time:', error)
    }
  }

  return (
    <div className="App">
      <h1>Sleep Tracker</h1>
      <div>
        <button onClick={handleGoToBed}>Go to Bed</button>
        <button onClick={handleWakeUp}>Wake Up</button>
      </div>
      <div>
        <p>Bedtime: {bedtime}</p>
        <p>Wake Up Time: {wakeupTime}</p>
      </div>
    </div>
  )
}

export default App
