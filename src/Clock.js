import { useState, useEffect } from "react";
import Dial from "./Dial.js";

const timeRemaining = (seconds) => {// function used to display remaining time on timer
    const remainingMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return remainingMinutes.toString().padStart(2, '0') + ":" + remainingSeconds.toString().padStart(2, '0');
};

const Clock = () => {    
    const [countingDown, setCountingDown] = useState(false);
    // display variables
    const [sessionTime, setSessionTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    // variables used for countdown
    const [sessionValue, setSessionValue] = useState(sessionTime * 60);
    const [breakValue, setBreakValue] = useState(breakTime * 60);
    // timer display
    var currentTime = sessionValue;

    // increment and decrement functions
    const incrementSessionTime = () => {
        if (countingDown === false && sessionTime < 60) {
            setSessionTime(sessionTime + 1);
            setSessionValue(sessionValue + 60);
        }

        console.log(sessionValue);
    };

    const decrementSessionTIme = () => {
        if (countingDown === false && sessionValue > 60) {
            setSessionTime(sessionTime - 1);
            setSessionValue(sessionValue - 60);
        }

        console.log(sessionValue);
    };

    const incrementBreakTime = () => {
        if (countingDown === false && breakValue < 3600) {
            setBreakTime(breakTime + 1);
            setBreakValue(breakValue + 60);
        }
    };

    const decrementBreakTime = () => {
        if (countingDown === false && breakValue > 60) {
            setBreakTime(breakTime - 1);
            setBreakValue(breakValue - 60);
        }
    };

    // timer control functions
    const toggleStartPause = () => {
        setCountingDown(!countingDown);
    };

    useEffect(() => { // ** timer using setInterval **
        var interval;
        
        if (countingDown === true && sessionValue > 0) {
            interval = setInterval(() => {
                setSessionValue(sessionValue - 1);
            }, 1000); // use state variables
        }
        

        console.log("Session seconds: " + sessionValue);
        console.log(countingDown);

        return () => clearInterval(interval);
    }, [sessionValue, countingDown]);

    return (
        <div className="clock">
            <div className="clock-dials">
                <Dial label="Session" value={sessionTime} onIncrement={incrementSessionTime} onDecrement={decrementSessionTIme} />
                <Dial label="Break" value={breakTime} onIncrement={incrementBreakTime} onDecrement={decrementBreakTime} />
            </div>
            <div className="timer">
                <h2 id="timer-label">Session</h2>
                <p id="time-left">{timeRemaining(currentTime)}</p>
            </div>
            <div className="timer-controls">
                <button onClick={toggleStartPause} id="start_stop">Start/Pause</button>
                <button id="reset">Reset</button>
            </div>
        </div>
    );
};

export default Clock;