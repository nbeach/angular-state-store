import {actionFactoryBuilder} from "../action"

export interface SearchAction {
}

export const searchAction = actionFactoryBuilder<SearchAction>()
