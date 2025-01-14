const Dial = (props) => {
    const label = props.label;
    const value = props.value;
    const onIncrement = props.onIncrement;
    const onDecrement = props.onDecrement;
    const idLabel = label.toLowerCase();

    return (
        <div className="dial">
            <h2 id={`${idLabel}-label`}>{label + " Length"}</h2>
            <div className="buttons">
                <button id={`${idLabel}-decrement`} onClick={onDecrement}>-</button>
                <h2 id={`${idLabel}-length`}>{value}</h2>
                <button id={`${idLabel}-increment`} onClick={onIncrement}>+</button>
            </div>
        </div>
    );
}

export default Dial;