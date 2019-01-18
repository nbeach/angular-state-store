import {actionFactoryBuilder} from "../../modules/action/action"

export interface QueryChangedAction {
  readonly query: string
}

export const queryChangedAction = actionFactoryBuilder<QueryChangedAction>()
