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
                <i class="material-icons" id={`${idLabel}-decrement`} onClick={onDecrement}>arrow_downward</i>
                <h2 id={`${idLabel}-length`}>{value}</h2>
                <i class="material-icons" id={`${idLabel}-increment`} onClick={onIncrement}>arrow_upward</i>
            </div>
        </div>
    );
}

export default Dial;