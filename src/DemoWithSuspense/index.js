import {Suspense} from 'react'
import Loading from '../components/Loading.js'
import SwitchTab from './SwitchTab.js'


export default function DemoWithSuspense(){
 
  return <div>
     <Suspense fallback={<Loading />}>
     <SwitchTab />
  </Suspense>
    </div>
}