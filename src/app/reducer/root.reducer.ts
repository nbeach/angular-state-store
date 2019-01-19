import {Action, ActionParameters, isAction} from "../lib/action"
import {AppState, OptionSelectionState} from "../model/state/app.state"
import {searchResultAction} from "../model/action/search-result.action"
import {queryChangedAction} from "../model/action/query-change.action"
import {MakeOptionChangeAction, makeOptionChangeAction} from "../model/action/make-option-change-action"
import {criteriaChangedAction} from "../model/action/criteria-changed.action"
import {replace} from "../util/array.util"

export function rootReducer(priorState: AppState, action: Action<ActionParameters>): AppState {

  if (isAction(queryChangedAction, action)) {
    return {...priorState, query: action.query}
  }

  if (isAction(searchResultAction, action)) {
    return {...priorState, results: action.results}
  }

  if (isAction(makeOptionChangeAction, action)) {
    return {...priorState, makesOptions: updateMakeOptions(priorState.makesOptions, action)}
  }

  if (isAction(criteriaChangedAction, action)) {
    const selectedMakes = action.criteria.makes
    const updatedMakeOptions =  priorState.makesOptions.map(option => ({...option, selected: selectedMakes.includes(option.value)}))
    return {...priorState, makesOptions: updatedMakeOptions}
  }

  return priorState
}


function updateMakeOptions(options: OptionSelectionState<string>[], action: MakeOptionChangeAction): OptionSelectionState<string>[] {
  const matcher = (option: OptionSelectionState<string>) => option.value === action.value
  const changed = options.find(matcher)!
  return replace(matcher, options, {...changed, selected: action.selected})
}

