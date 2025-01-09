import Dial from "./Dial.js";

const Clock = () => {
    
    return (
        <div className="clock">
            <div className="clock-dials">
                <Dial label="Session" initValue="25" />
                <Dial label="Break" initValue="5" />
            </div>
            <div className="timer">
                <h2 className="timer-label">Session</h2>
                <p className="time-left">00:00</p>
            </div>
            <div className="timer-controls">
                {/* play/pause button */}
                {/* reset button */}
            </div>
        </div>
    );
};

export default Clock;