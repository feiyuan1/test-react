import {createStore} from 'redux'
import rootReducer from './reducer'

export type Color = 'purple' | 'blue' | 'red' 
export interface TodoItem {
  id: number,
  text: string,
  completed: boolean,
  color?: Color
}
export type Status = 'Active' | 'All'

export interface State {
  todoList: TodoItem[],
  filter: {
    status: Status,
    color?: Color
  }
}

const store = createStore(rootReducer)

store.subscribe(() => {
  console.log('dispatch:', store.getState())
})

export default store