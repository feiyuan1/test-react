import {applyMiddleware, createStore} from 'redux'
import {thunk} from 'redux-thunk'
import rootReducer from './reducer'
import {Record} from 'immutable'

export type Color = 'purple' | 'blue' | 'red' 

export interface TodoItem {
  id: number,
  text: string,
  completed: boolean,
  color?: Color
}

export type TodoItemRecord= Record<TodoItem>

export type Status = 'Active' | 'All'


// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(() => {
  console.log('dispatch:', store.getState())
})

export default store