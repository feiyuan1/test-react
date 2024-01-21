import {Component} from 'react'
import BoilWatch from '../boilWatch/boilWatch'
import InputTemp from '../inputTemp/inputTemp'

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
  
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

export default class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            temp: '',
            type: 'C' //C摄氏度  F华氏度
        }
    }
    handleCInputChange = temp => {
        this.setState({
            temp,
            type: 'C'
        })
    }
    handleFInputChange = temp => {
        this.setState({
            temp,
            type: 'F'
        })
    }
    test = (value, convert) => {
        //整理数据格式
        value = parseFloat(value)
        if(Number.isNaN(value)) {
            return ''
        }else {
            return Math.round(convert(value) * 1000) / 1000  
        }
    }
    render() {
        let {type,temp} = this.state;
        let cValue = type === 'F' ? this.test(temp, toCelsius) : temp;
        let fValue = type === 'C' ? this.test(temp, toFahrenheit) : temp;
        return (
            <div>
                <div>
                    华氏温度(F):
                    <InputTemp value={cValue} handleInputChange={this.handleCInputChange}/>
                </div>
                <div>
                    摄氏温度(C):
                    <InputTemp value={fValue} handleInputChange={this.handleFInputChange}/>
                </div>
                <BoilWatch num={parseFloat(cValue)} />
            </div>
        )
    }
}
