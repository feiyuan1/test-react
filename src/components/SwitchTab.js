import {lazy, useDeferredValue, useState} from 'react'
import lazyLoad from '../lazyLoad.js'

const Print = lazy(() => lazyLoad(import('./Print.js')))
const Test = lazy(() => lazyLoad(import('./Test.js')))

export default function SwitchTab(){
  const [isPrintTab, setPrintTab] = useState(true)
  const deferredPrintTab = useDeferredValue(isPrintTab)

  return  (<div>
  {deferredPrintTab ? <Print /> : <Test />}
<button onClick={() => {setPrintTab(old => !old)}}>Switch</button>
</div>)
}