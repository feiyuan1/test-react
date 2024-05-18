import React, { useState } from "react";

function Children({status: initStatus}){
  const [status, setStatus] = useState(initStatus)
  const handleClick = () => {
    setStatus({
      ...status,
      inner: 'changed'
    })
  }
  console.log('children-render: ', status)

  return <>
    <button onClick={handleClick}>children-change</button>
  </>
}

export default function PropUpdate() {
  const [states, setStates] = useState({cur: false})

  const handleChangeStates = () => {
    setStates({
      cur: true
    })
  }

  return <>
    <button onClick={handleChangeStates}>propChange</button>
    prop change wont affect children's state reset
    <Children status={states}/>
  </>
}