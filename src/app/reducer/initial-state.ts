import {AppState} from "../model/state/app.state"

export const initialState: AppState = {
  query: "",
  results: [],
  makesOptions: [
    { title: "Ford", value: "ford", selected: false},
    { title: "Chevy", value: "chevy", selected: false},
    { title: "Dodge", value: "dodge", selected: false},
  ],
}
