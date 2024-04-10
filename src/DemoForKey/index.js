import { useState } from "react"
import Child from "./Child"

export default function DemoForKey(){
  const [list, setList] = useState([
    {text: 'a', id: '1'},
    {text: 'b', id: '2'},
    {text: 'c', id: '3'},
  ])

  return <>
    <button onClick={()=>{setList([
      {text: 'c', id: '3'},
      {text: 'b', id: '2'},
      {text: 'a', id: '1'},
    ])}}>
      resort
    </button>

    {list.map((item, index) => (<Child key={item.id} text={item.text}/>))}
  </>
}