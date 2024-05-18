import { useEffect, useState } from "react";
import useMount from './hooks/useMount'
import usePromiseAll from './hooks/usePromiseAll'
import {useSingleModel, observeModel, useSubModel, useProxyModel} from './hooks/hooksForModel'

export default function Test(){
  const [obj, setObj] = useState({
    first: {
      second: {
        third: 1
      }
    }
  })
 
  // observeModel.useIntersectionObserver()
  // useSingleModel()
  // useObserverModel()
  // useSubModel()
  // useProxyModel()

  // const allResult = usePromiseAll([
  //   new Promise(res => res('no1')),
  //   new Promise((res, rej) => rej('no2')),
  //   new Promise(res => res('no3')),
  // ])

  // useMount(() => {
  //   allResult.then(console.log).catch(console.warn)
  // })

  const handleClick = () => {
    const cloneObj = JSON.parse(JSON.stringify(obj))
    cloneObj.first.second.third = 2
    setObj(cloneObj)
  }

  return <>
  <button onClick={handleClick}>handleClick</button>
  {JSON.stringify(obj)}
  </>
}