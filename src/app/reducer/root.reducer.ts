import {Action, ActionParameters, isAction} from "../lib/action"
import {AppState} from "../model/state/app.state"
import {searchResultAction} from "../model/action/search-result.action"
import {queryChangedAction} from "../model/action/query-change.action"

export function rootReducer(priorState: AppState, action: Action<ActionParameters>): AppState {

  if (isAction(queryChangedAction, action)) {
    return {...priorState, query: action.query}
  }

  if (isAction(searchResultAction, action)) {
    return {...priorState, results: action.results}
  }

  return priorState
}
