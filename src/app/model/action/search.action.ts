import {actionFactoryBuilder} from "../../modules/action/action"

export interface SearchAction {
}

export const searchAction = actionFactoryBuilder<SearchAction>()
