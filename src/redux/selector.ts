import {State} from './index'
import {STATUS} from './constant'

const createSelector = (deps: Function[], selector: Function) => {
  const cache = {}

  return (state: State) => {
    const params = deps.map(dep => dep(state))
    selector(...params)
    const key = JSON.stringify(params)
    if(cache[key]) {
      return cache[key]
    }

    cache[key] = selector(...params)
    return cache[key]
  }
}

export const selectTodo = (state: State) => state.todoList

export const selectCompleteTodo = (state: State) => state.todoList.filter(todo => todo.completed)

export const seleteFilter = (state: State) => state.filter

export const selectTodoWithFilter = createSelector(
  [
    (state: State) => state.todoList,
    (state: State) => state.filter,
  ],
  (todoList: State['todoList'], filter: State['filter']) => {
  const {status, color} = filter
  return todoList.filter(todo => (!color || color === todo.color) && (status === STATUS.All || todo.completed))
})

export const selectPerson = (state: State) => state.person