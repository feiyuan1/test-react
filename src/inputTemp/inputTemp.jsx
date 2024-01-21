import './inputTemp.css'

export default function InputTemp(props) {
    let inputChange = (e) => {
        props.handleInputChange(e.target.value)
    }
    return (
        <div>
            <input className="input" value={props.value} onInput={inputChange} />
        </div>
    )
}