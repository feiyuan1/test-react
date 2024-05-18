import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useRef,
  useContext,
  useState,
  useEffect
} from "react";
import { useDispatch, useSelector, ReactReduxContext } from "react-redux";
import {
  selectPerson,
  selectTodo,
  selectTodoWithFilter,
  seleteFilter,
} from "../redux/selector";
import Todo from "./Todo";
import { addTodoItem, allCompleted } from "../redux/todo";
import { changeFilterStatus } from "../redux/filter";
import { addName } from "../redux/person";
import { Status, TodoItem } from "../redux";

// selector = state => state.xxx
const useMySelector = function(selector){
  const {store: {getState, subscribe}} = useContext(ReactReduxContext)
  const [state, setState] = useState(selector(getState()))
  
  useEffect(()=>{
    subscribe(() => {
      setState(selector(getState()))
    })
  }, [subscribe])

  return state
}
export function TodoList() {
  // const {store} = useContext(ReactReduxContext)
  // console.log('context: ', store.getState().todoList)
  // const todoList = useSelector(selectTodoWithFilter);
  const todoList = useMySelector(selectTodoWithFilter);
  // const [todoList, setTodoList] = useState(store.getState().todoList)
  
  const dispatch = useDispatch();
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    dispatch(addTodoItem(Math.random().toString()));
  }, []);

  const handleComplete = () => {
    // @ts-ignore
    dispatch(allCompleted);
  };

  // useEffect(() => {
  //   store.subscribe(() => {
  //     setTodoList(store.getState().todoList)
  //   })
  // }, [store])

  return (
    <div>
      <button onClick={handleComplete}>completedAll</button>
      <button onClick={handleClick}>addTodoItem</button>
      ----todolist
      {todoList.map((item: TodoItem, index: number) => (
        <Todo key={index} data={item} />
      ))}
    </div>
  );
}

const colorOptions = {
  red: "hongse",
  purple: "zise",
  blue: "lanse",
};

const statusOptions = {
  All: "suoyou",
  Active: "completed",
};

function Select({
  defaultText,
  options,
  defaultValue,
  handleChange,
}: {
  defaultText: string;
  options: object;
  defaultValue: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <select onChange={handleChange} defaultValue={defaultValue}>
      <option value="">{defaultText}</option>
      {Object.keys(options).map((key, index) => (
        <option value={key} key={index}>
          {options[key]}
        </option>
      ))}
    </select>
  );
}

export function Filter() {
  const dispatch = useDispatch();
  const { status, color } = useSelector(seleteFilter);
  const handleColorChange = () => {};
  const handleStatusChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value as Status;
    dispatch(changeFilterStatus(value));
  };

  console.log('render-filter')

  return (
    <div>
      <Select
        options={colorOptions}
        defaultText="select color"
        defaultValue={color}
        handleChange={handleColorChange}
      />
      <Select
        options={statusOptions}
        defaultText="select status"
        defaultValue={status}
        handleChange={handleStatusChange}
      />
    </div>
  );
}

const Person = () => {
  const person = useSelector(selectPerson);
  const dispatch = useDispatch();
  const nameRef = useRef<string>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    nameRef.current = e.target.value;
  };
  const handleChangeName = () => {
    dispatch(addName(nameRef.current));
  };

  return (
    <div>
      <input onChange={handleChange} placeholder="input your name" />
      <button onClick={handleChangeName}>change name</button>
      name: {person.name}
    </div>
  );
};
export default function DemoForRedux() {
  return (
    <div>
      ----demo for redux-----
      <Person />
      <Filter />
      <TodoList />
    </div>
  );
}
