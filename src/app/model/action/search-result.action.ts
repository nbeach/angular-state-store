import {actionFactoryBuilder} from "../../lib/action/action"

export interface SearchResultAction {
  readonly results: string[]
}

export const searchResultAction = actionFactoryBuilder<SearchResultAction>()
