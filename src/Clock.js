import { useState, useEffect } from "react";
import Dial from "./Dial.js";

const timeRemaining = (seconds) => {// function used to display remaining time on timer
    const remainingMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return remainingMinutes.toString().padStart(2, '0') + ":" + remainingSeconds.toString().padStart(2, '0');
};

const Clock = () => {
    const alarm = document.getElementById("beep");
    const [state, setState] = useState({// object used to store all state variables of timer
        label: "Session",
        countingDown: false,
        sessionTime: 25,
        breakTime: 5,
        sessionValue: 25 * 60,
        breakValue: 5 * 60
    });

    // increment and decrement functions
    const incrementSessionTime = () => {
        if (state.countingDown === false && state.sessionTime < 60) {
            setState(prev => ({
                ...prev,
                sessionTime: state.sessionTime + 1,
                sessionValue: (state.sessionTime * 60) + 60,
            }));
        }
    };

    const decrementSessionTime = () => {
        if (state.countingDown === false && state.sessionTime > 1) {
            setState(prev => ({
                ...prev,
                sessionTime: state.sessionTime - 1,
                sessionValue: (state.sessionTime * 60) - 60,
            }));
        }
    };

    const incrementBreakTime = () => {
        if (state.countingDown === false && state.breakTime < 60) {
            setState(prev => ({
                ...prev,
                breakTime: state.breakTime + 1,
                breakValue: (state.breakTime * 60) + 60,
            }));
        }
    };

    const decrementBreakTime = () => {
        if (state.countingDown === false && state.breakTime > 1) {
            setState(prev => ({
                ...prev,
                breakTime: state.breakTime - 1,
                breakValue: (state.breakTime * 60) - 60,
            }));
        }
    };

    //timer reset function
    const handleReset = () => {// resets entire app to default state
        resetAudio();
        setState({
            label: "Session",
            countingDown: false,
            sessionTime: 25,
            breakTime: 5,
            sessionValue: 25 * 60,
            breakValue: 5 * 60
        });
    };

    // timer control function
    const toggleStartPause = () => {
        setState(prev => ({...prev, countingDown: !state.countingDown}));
    };

    // audio functions
    const resetAudio = () => {
        alarm.pause();
        alarm.currentTime = 0;
    };

    const playAudio = () => {
        resetAudio();
        alarm.play();
    };

    useEffect(() => { // ** timer using setInterval **
        var timer;

        if (state.countingDown === true) {
            timer = setInterval(() => {
                if (state.label === "Session") {
                    if (state.sessionValue > 0) setState(prev => ({...prev, sessionValue: state.sessionValue - 1}));
                    else { // switch to break, play alarm
                        playAudio();
                        setState(prev => ({...prev, label: "Break", sessionValue: (prev.sessionTime * 60)}));
                    }
                } else {
                    if (state.breakValue > 0) setState(prev => ({...prev, breakValue: state.breakValue - 1}));
                    else { // switch to session, play alarm
                        playAudio();
                        setState(prev => ({...prev, label: "Session", breakValue: (prev.breakTime * 60)}));
                    }
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [state.label, state.sessionValue, state.breakValue, state.countingDown]);

    return (
        <div className="clock">
            <div className="clock-dials">
                <Dial label="Session" value={state.sessionTime} onIncrement={incrementSessionTime} onDecrement={decrementSessionTime} />
                <Dial label="Break" value={state.breakTime} onIncrement={incrementBreakTime} onDecrement={decrementBreakTime} />
            </div>
            <div className="timer">
                <h2 id="timer-label">{state.label}</h2>
                {// ** conditional rendering to display respective timer for label **
                state.label === "Session"
                    ? <p id="time-left">{timeRemaining(state.sessionValue)}</p>
                    : <p id="time-left">{timeRemaining(state.breakValue)}</p>
                    // edit this portion of the code to display less than 1 minute left in CSS using conditionals
                }
            </div>
            <div className="timer-controls">
                <button onClick={toggleStartPause} id="start_stop">Start/Pause</button>
                <button onClick={handleReset} id="reset">Reset</button>
            </div>
            <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" />
        </div>
    );
};

export default Clock;