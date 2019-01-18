import {actionFactoryBuilder} from "../../lib/action/action"

export interface SearchAction {
}

export const searchAction = actionFactoryBuilder<SearchAction>()
