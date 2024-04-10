import {State} from './index'
import {STATUS} from './constant'

export const selectTodo = (state: State) => state.todoList

export const selectCompleteTodo = (state: State) => state.todoList.filter(todo => todo.completed)

export const seleteFilter = (state: State) => state.filter

export const selectTodoWithFilter = (state: State) => {
  const {status, color} = state.filter
  return state.todoList.filter(todo => (!color || color === todo.color) && (status === STATUS.All || todo.completed))
}