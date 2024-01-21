import {lazy, Suspense, useState} from 'react'
import Loading from './components/Loading.js'
import lazyLoad from './lazyLoad.js'

const Print = lazy(() => lazyLoad(import('./components/Print.js')))
const Test = lazy(() => lazyLoad(import('./components/Test.js')))

export default function DemoWithSuspense(){
  const [isPrintTab, setPrintTab] = useState(true)

  return <div>
     <Suspense fallback={<Loading />}>
    {isPrintTab ? <Print /> : <Test />}
  </Suspense>
<button onClick={() => {setPrintTab(old => !old)}}>Switch</button>
    </div>
  
}