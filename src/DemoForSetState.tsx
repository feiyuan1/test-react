import React, {useState} from "react"
import useToggle from "./DemoForTs/useToggle"

const ComponentA = () => {
  console.log('render----start')
  const [count, setCount] = useState(0)
  const [times, setTimes] = useState(0)
  const handleClick = () => {
    setCount(4)
    setCount((count) => {
      console.log('setCount0', count)
      return count + 1
    })
    setCount((count) => {
      console.log('setCount1', count)
      return count + 2
    })
  }
  const addTimes = () => {
    setTimes(times => {
      console.log('addTimes')
      return times + 1
    })
  }

  console.log('render----end')

  return <div>
    {count}
    <button onClick={handleClick}>setCount</button>
    <button onClick={addTimes}>addTimes</button>
  </div>
}

const ComponentB = () => {
  const {status, toggle} = useToggle()
  console.log('render----start')
  const [count, setCount] = useState(0)
  const [times, setTimes] = useState(0)
  const handleClick = () => {
    setCount(4)
    setCount((count) => {
      console.log('setCount0', count)
      return count + 1
    })
    setCount((count) => {
      console.log('setCount1', count)
      return count + 2
    })
  }
  const addTimes = () => {
    setTimes(times => {
      console.log('times: ', times)
      return status ? times : times + 1
    })
    setCount(count + 1)
  }

  console.log('render----end')

  return <div>
    {count}
    <button onClick={handleClick}>setCount</button>
    {times}
    <button onClick={addTimes}>addTimes</button>
    <button onClick={toggle}>{JSON.stringify(status)}</button>
  </div>
}

class ComponentC extends React.Component {
  state = {
    num: 1,
    times: 1,
  }
  onClick = () => {
    console.log('state 1');
    this.setState({
      num: this.state.num + 1,
    });
    console.log('state 2');
    this.setState({
      times: this.state.times +1,
    });
    console.log('state 3');
  }

  render() {
    console.log('render');
    const { num, times } = this.state
    return (
      <div>
        组件1
        <button onClick={this.onClick}>更新</button>
        <div>
          num:{num}
        </div>
        <div>
          times:{times}
        </div>
      </div>
    );
  }
}

export default function DemoForSetState(){
  return <>
    <ComponentA />
    <ComponentB />
    {/* <ComponentC /> */}
  </>
}