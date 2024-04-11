import { PERSON_ACTIONS } from "../action"

export const addName = (name: string) => {
  return {
    type: PERSON_ACTIONS.ADDNAME,
    payload: name
  }
}