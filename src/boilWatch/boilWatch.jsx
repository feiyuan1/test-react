import {Component} from 'react'

export default class BoilWatch extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        if(this.props.num >= 100) {
            return <div>the water is boiled</div>
        } else {
            return <div>the water is not boiled!!!</div>
        }
    }
}