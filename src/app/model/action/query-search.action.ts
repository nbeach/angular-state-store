import {actionFactoryBuilder, ActionParameters} from "../../lib/action"

export interface QuerySearchAction extends ActionParameters {
}

export const querySearchAction = actionFactoryBuilder<QuerySearchAction>()
