import {ActionFactory, actionFactoryBuilder} from "./action"

export interface SearchAction {
    readonly bar: string
}

export const searchAction = actionFactoryBuilder<SearchAction>()
