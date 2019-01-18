import {actionFactoryBuilder} from "../action"

export interface SearchResultAction {
  readonly results: string[]
}

export const searchResultAction = actionFactoryBuilder<SearchResultAction>()
