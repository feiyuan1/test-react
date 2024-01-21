import {lazy, Suspense, useDeferredValue, useState} from 'react'
import Loading from './components/Loading.js'
import lazyLoad from './lazyLoad.js'

const Print = lazy(() => lazyLoad(import('./components/Print.js')))
const Test = lazy(() => lazyLoad(import('./components/Test.js')))

export default function DemoWithSuspense(){
  const [isPrintTab, setPrintTab] = useState(true)
  const deferredPrintTab = useDeferredValue(isPrintTab)

  return <div>
     <Suspense fallback={<Loading />}>
    {deferredPrintTab ? <Print /> : <Test />}
  </Suspense>
<button onClick={() => {setPrintTab(old => !old)}}>Switch</button>
    </div>
}