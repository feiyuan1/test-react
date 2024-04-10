import React from "react"
import { todoToggled } from "../redux/todo"
import { useDispatch } from "react-redux"

export default function Todo({data}){
  const dispatch = useDispatch()
  const {completed, color, id, text} = data
  const handleChange = () => {
    dispatch(todoToggled(id))
  }

  return <div style={{display: 'flex', background: color || 'rgba(0,0,0,0,2)', margin: '10px', padding: '10px', borderRadius: '10px', width: '200px', border: '1px solid black'}}>
    {id}
    <div style={{padding: '0 10px', flex: 1}}>{text}</div>
    <input type="checkbox" checked={completed} onChange={handleChange}/>
  </div>
}