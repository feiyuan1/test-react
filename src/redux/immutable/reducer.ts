import {combineReducers} from 'redux'
import {TODO_ACTIONS, FILTER_ACTIONS, PERSON_ACTIONS} from '../action'
import {TodoItemRecord } from '.'
import {STATUS} from '../constant'
import {Record, List} from 'immutable'

const initState = {
  todoList: List<TodoItemRecord>([]),
  filter: Record({
    status: STATUS.All,
  })(),
  person: Record({
    name: '匿名用户'
  })()
}

export type State = typeof initState

function nextTodoId(todos: List<TodoItemRecord>) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.get('id'), maxId), -1)
  return maxId + 1
}

const todoListReducer = (state = initState.todoList, action) => {
  const {type, payload} = action
  switch (type) {
    case TODO_ACTIONS.ALLCOMPLETED: 
      return state.forEach(todo => todo.set('completed', true))
    case TODO_ACTIONS.TODOTOGGLED: 
      return state.forEach(todo => {
        if(todo.get('id') === payload){
          todo.set('completed', !todo.get('completed'))
        }
        return todo
      })
    case TODO_ACTIONS.TODOADDED: 
      return state.push(Record({
        id: nextTodoId(state),
        text: payload,
        completed: false
      })())
    default: return state
  }
}

const filterReducer = (state = initState.filter, action) => {
  const {type, payload} = action
  switch(type) {
    case FILTER_ACTIONS.STATUSFILTERCHANGED: 
      return state.set('status', payload)

    default: 
      return state
  }
}

const PersonReducer = (state = initState.person, action) => {
  const {type, payload} = action
  switch(type) {
    case PERSON_ACTIONS.ADDNAME: 
      return state.set('name', payload)

    default:
      return state
  }
}

const rootReducer = combineReducers({
  todoList: todoListReducer, 
  filter: filterReducer,
  person: PersonReducer
})
 

export default rootReducer