import { State, Actions } from "./reducers/todo-ducks"

export interface ComponentWithReducers {
  state: State
  dispatch: React.Dispatch<Actions>
}
