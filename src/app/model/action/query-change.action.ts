import {actionFactoryBuilder, ActionParameters} from "../../lib/action"

export interface QueryChangedAction extends ActionParameters{
  readonly query: string
}

export const queryChangedAction = actionFactoryBuilder<QueryChangedAction>()
