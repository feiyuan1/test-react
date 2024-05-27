import React, { useEffect, useState, useMemo, useCallback } from "react";

function Children({status: initStatus}){
  const [status, setStatus] = useState(initStatus)

  const handleClick = useCallback(() => {
    setStatus({
      // ...status,
      inner: 'changed'
    })
  }, [])

  // 状态更新& dom 更新时才会触发？
  useEffect(() => {
    console.log('effect')
  }, [status])

  useMemo(() => {
    console.log('memo')
    return {}
  }, [status])

  console.log('children-render: ', status, initStatus)

  return <>
    <button onClick={handleClick}>children-change</button>
    {/* {JSON.stringify(initStatus)} */}
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