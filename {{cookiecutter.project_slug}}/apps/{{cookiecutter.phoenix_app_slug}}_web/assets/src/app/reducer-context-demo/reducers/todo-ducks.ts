/* @typescript-eslint/no-angle-bracket-type-assertion */
import { normalizeArrayData } from "../../../helpers"

export interface ItemType {
  id: string
  task: string
  isCompleted: boolean
}

export interface State {
  items: {
    [key: string]: ItemType
  }
  itemIds: (keyof State["items"])[]
  completedItems: (keyof State["items"])[]
}

type ItemIds = keyof State["items"]

export const initialState: State = {
  items: {},
  itemIds: [],
  completedItems: [],
}

export const todoActions = {
  addItems: (items: ItemType | ItemType[]) =>
    <const>{
      type: "ADD_ITEMS",
      items: Array.isArray(items) ? items : [items],
    },
  removeItems: (itemIds: ItemIds[]) =>
    <const>{
      type: "REMOVE_ITEMS",
      itemIds,
    },
  completeItem: (item: ItemIds) =>
    <const>{
      type: "COMPLETE_ITEM",
      item,
    },
  uncompleteItem: (item: ItemIds) =>
    <const>{
      type: "UNCOMPLETE_ITEM",
      item,
    },
}

export type Actions = ReturnType<
  | typeof todoActions.addItems
  | typeof todoActions.removeItems
  | typeof todoActions.completeItem
  | typeof todoActions.uncompleteItem
>

export const Reducers: React.Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case "ADD_ITEMS":
      return {
        ...state,
        items: {
          ...state.items,
          ...normalizeArrayData(action.items),
        },
      }
    case "REMOVE_ITEMS":
      return {
        ...state,
        itemIds: state.itemIds.filter(id => !action.itemIds.includes(id)),
      }
    case "COMPLETE_ITEM":
      return {
        ...state,
        completedItems: [...state.completedItems, action.item],
      }
    case "UNCOMPLETE_ITEM":
      return {
        ...state,
        completedItems: state.completedItems.filter(
          item => action.item !== item,
        ),
      }
    default:
      return state
  }
}
