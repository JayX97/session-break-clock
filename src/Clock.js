import { useState, useEffect } from "react";
import Dial from "./Dial.js";

const Clock = () => {
    const [countingDown, setCountingDown] = useState(false);
    const [sessionValue, setSessionValue] = useState(25);
    const [breakValue, setBreakValue] = useState(5);
    // variables used for countdown
    var sessionSeconds = sessionValue * 60;
    var breakSeconds = breakValue * 60;
    const [currentTime, setCurrentTime] = useState(sessionSeconds);

    const timeRemaining = (seconds) => {// functions used to display remaining time on timer
        const remainingMinutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return remainingMinutes.toString().padStart(2, '0') + ":" + remainingSeconds.toString().padStart(2, '0');
    };

    // increment and decrement functions
    const incrementSessionValue = () => {
        if (countingDown === false && sessionValue < 60) {
            setSessionValue(sessionValue + 1);
        };

        sessionSeconds = sessionValue * 60;
    };

    const decrementSessionValue = () => {
        if (countingDown === false && sessionValue > 1) {
            setSessionValue(sessionValue - 1);
        };

        sessionSeconds = sessionValue * 60;
    };

    const incrementBreakValue = () => {
        if (countingDown === false && breakValue < 60) {
            setBreakValue(breakValue + 1);
        };

        breakSeconds = breakValue * 60;
    };

    const decrementBreakValue = () => {
        if (countingDown === false && breakValue > 1) {
            setBreakValue(breakValue - 1);
        };

        breakSeconds = breakValue * 60;
    };

    // timer control functions
    const toggleStartPause = () => {
        setCountingDown(!countingDown);
    };

    useEffect(() => {
        var interval;
        if (countingDown === true && currentTime > 0) {
            interval = setInterval(() => {
                setCurrentTime((currentTime) => currentTime - 1);
            }, 1000); // use state variables
        }

        console.log(sessionSeconds);

        return () => clearInterval(interval);
    }, [currentTime, countingDown]);

    return (
        <div className="clock">
            <div className="clock-dials">
                <Dial label="Session" value={sessionValue} onIncrement={incrementSessionValue} onDecrement={decrementSessionValue} />
                <Dial label="Break" value={breakValue} onIncrement={incrementBreakValue} onDecrement={decrementBreakValue} />
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