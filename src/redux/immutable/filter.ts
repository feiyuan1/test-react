import { Status } from "./index";
import { FILTER_ACTIONS } from "../action";

export function changeFilterStatus(status: Status){
  return {
    type: FILTER_ACTIONS.STATUSFILTERCHANGED,
    payload: status
  }
}