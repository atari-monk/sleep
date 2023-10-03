import { useState } from "react";
import axios from "axios";

function App() {
    const [bedtime, setBedtime] = useState<string>("");
    const [wakeupTime, setWakeupTime] = useState<string>("");

    const handleRecordSleep = async () => {
        try {
            await axios.post("/api/sleep-record", { bedtime, wakeupTime });
            alert("Sleep record saved successfully!");
        } catch (error) {
            console.error("Error saving sleep record:", error);
        }
    };

    return (
        <div className="App">
            <h1>Sleep Tracker</h1>
            <div>
                <button
                    onClick={() => setBedtime(new Date().toLocaleTimeString())}
                >
                    Go to Bed
                </button>
                <button
                    onClick={() =>
                        setWakeupTime(new Date().toLocaleTimeString())
                    }
                >
                    Wake Up
                </button>
            </div>
            <div>
                <p>Bedtime: {bedtime}</p>
                <p>Wake Up Time: {wakeupTime}</p>
                <button onClick={handleRecordSleep}>Record Sleep</button>
            </div>
        </div>
    );
}

export default App;
