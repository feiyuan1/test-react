import {applyMiddleware, createStore} from 'redux'
import * as thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
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

// const asyhhhEnhancer = (createStore) => {
//   return (reducer, initStore, enhancer) => {
//     const store = createStore(reducer, initStore, enhancer)

//     const myDispatch = (action) => {
//       store.dispatch(action)
//       console.log('hhh')
//     }

//     return {
//       ...store,
//       dispatch: myDispatch
//     }
//   }
// }

const asyncMiddleware = (storeApi: typeof store) => next => action => {
  if(typeof action === 'function'){
    return action(storeApi.dispatch, storeApi.getState)
  }
  return next(action)
}

console.log('thunkMiddleware: ', thunkMiddleware)
const asyncEnhancer = applyMiddleware(asyncMiddleware)
const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
// @ts-ignore
const store = createStore(rootReducer, asyncEnhancer)

store.subscribe(() => {
  console.log('dispatch:', store.getState())
})

export default store