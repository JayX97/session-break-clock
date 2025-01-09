const Dial = (props) => {
    const label = props.label;
    const initValue = props.initValue;

    return (
        <div className="dial">
            <h2 className={`${label.toLowerCase()}-label`}>{label + " Length"}</h2>
            <div className="buttons">
                <button></button>
                <h2 className={`${label.toLowerCase()}-length`}>{initValue}</h2>
                <button></button>
            </div>
        </div>
    );
}

export default Dial;