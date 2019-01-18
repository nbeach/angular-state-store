import {Action, isAction} from "../../action/action"
import {AppState} from "../../model/state/app.state"
import {searchResultAction} from "../../action/search/search-result.action"
import {queryChangedAction} from "../../action/search/query-change.action"

export function rootReducer(priorState: AppState, action: Action<any>): AppState {
  if (isAction(queryChangedAction, action)) {
    return {...priorState, query: action.query}
  }

  if (isAction(searchResultAction, action)) {
    return {...priorState, results: action.results}
  }

  return priorState
}
