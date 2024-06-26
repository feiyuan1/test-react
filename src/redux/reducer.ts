import {combineReducers} from 'redux'
import {TODO_ACTIONS, FILTER_ACTIONS, PERSON_ACTIONS} from './action'
import {State, TodoItem } from './index'
import {STATUS} from './constant'

const initState: State = {
  todoList: [],
  filter: {
    status: STATUS.All,
  },
  person: {
    name: '匿名用户'
  }
}

function nextTodoId(todos: TodoItem[]) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

const todoListReducer = (state = initState.todoList, action) => {
  const {type, payload} = action
  switch (type) {
    case TODO_ACTIONS.ALLCOMPLETED: 
      return state.map(todo => ({
        ...todo,
        completed: true
      }))
    case TODO_ACTIONS.TODOTOGGLED: 
      return state.map(todo => {
        if(todo.id === payload){
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo
      })
    case TODO_ACTIONS.TODOADDED: 
      return  [
        ...state,
        {
          id: nextTodoId(state),
          text: payload,
          completed: false
        }
      ]
    default: return state
  }
}

const filterReducer = (state = initState.filter, action) => {
  const {type, payload} = action
  switch(type) {
    case FILTER_ACTIONS.STATUSFILTERCHANGED: 
      return {
        ...state,
        status: payload
      }

    default: 
      return state
  }
}

const PersonReducer = (state = initState.person, action) => {
  const {type, payload} = action
  switch(type) {
    case PERSON_ACTIONS.ADDNAME: 
      return {
        name: payload
      }

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