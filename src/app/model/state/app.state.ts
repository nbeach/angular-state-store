export interface AppState {
  readonly query: string
  readonly results: string[]
  readonly makesOptions: OptionSelectionState<string>[]
}

export interface OptionSelectionState<T> {
  readonly title: string,
  readonly value: T,
  readonly selected: boolean
}
