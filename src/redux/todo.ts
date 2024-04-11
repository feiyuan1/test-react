import { TodoItem } from ".";
import { TODO_ACTIONS } from "./action";

export function addTodoItem(text: TodoItem['text']) {
  return {
    type: TODO_ACTIONS.TODOADDED,
    payload: text
  }
}

export function todoToggled(id: TodoItem['id']){
  return {
    type: TODO_ACTIONS.TODOTOGGLED,
    payload: id
  }
}

export async function allCompleted(dispatch, getState) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(void 0)
    }, 2000)
  }).then(() => dispatch({
    type: TODO_ACTIONS.ALLCOMPLETED
  }))
}
