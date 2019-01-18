import {actionFactoryBuilder, ActionParameters} from "../../lib/action"

export interface SearchAction extends ActionParameters {
}

export const searchAction = actionFactoryBuilder<SearchAction>()
