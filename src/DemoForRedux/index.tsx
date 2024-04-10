import React, { ChangeEventHandler, MouseEventHandler, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectTodo, selectTodoWithFilter, seleteFilter } from "../redux/selector"
import Todo from './Todo'
import { addTodoItem } from "../redux/todo"
import { changeFilterStatus } from "../redux/filter"
import { Status } from "../redux"

export function TodoList(){
  const todoList = useSelector(selectTodoWithFilter)
  const dispatch = useDispatch()
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(addTodoItem(Math.random().toString()))
  }, [])

  return <div>
    <button onClick={handleClick}>addTodoItem</button>
    ----todolist
    {todoList.map((item, index) => <Todo key={index} data={item}/>)}
  </div>
}

const colorOptions = {
  red: 'hongse',
  purple: 'zise',
  blue: 'lanse'
}

const statusOptions = {
  'All': 'suoyou',
  'Active': 'completed'
}

function Select({defaultText, options, defaultValue, handleChange}:{defaultText:string , options: object, defaultValue: string, handleChange: ChangeEventHandler<HTMLSelectElement>}){
  return  <select onChange={handleChange} defaultValue={defaultValue}>
  <option value="">{defaultText}</option>
  {Object.keys(options).map((key, index) => <option value={key} key={index}>{options[key]}</option>)}
</select>
}

export function Filter(){
  const dispatch = useDispatch()
  const {status, color} = useSelector(seleteFilter)
  const handleColorChange = () => {}
  const handleStatusChange:ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value as Status
    dispatch(changeFilterStatus(value))
  }

  return <div>
    <Select options={colorOptions} defaultText="select color" defaultValue={color} handleChange={handleColorChange}/>
    <Select options={statusOptions} defaultText="select status" defaultValue={status} handleChange={handleStatusChange}/>
  </div>
}

export default function DemoForRedux(){
  return <div>
    ----demo for redux-----
    <Filter />
    <TodoList />
  </div>
}