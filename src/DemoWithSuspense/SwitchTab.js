import {lazy, useState, startTransition} from 'react'
import lazyLoad from '../utils/lazyLoad.js'

const Print = lazy(() => lazyLoad(import('./Print.js')))
const Test = lazy(() => lazyLoad(import('./Test.js')))

export default function SwitchTab(){
  const [isPrintTab, setPrintTab] = useState(true)

  return  (<div >
  {isPrintTab ? <Print /> : <Test />}
<button onClick={() => {startTransition(()=>setPrintTab(old => !old))}}>Switch</button>
</div>)
}