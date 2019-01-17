import {searchAction} from "../action/search.action"
import {Action, isAction} from "../action/action"
import {AppState} from "../../../../../../Desktop/store/state/app.state"

export function rootReducer(priorState: AppState, action: Action<any>): AppState {
    if (isAction(searchAction, action)) {
        return { foo: action.bar }
    }

    return priorState
}
