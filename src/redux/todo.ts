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