import {actionFactoryBuilder} from "../action"

export interface QueryChangedAction {
  readonly query: string
}

export const queryChangedAction = actionFactoryBuilder<QueryChangedAction>()
