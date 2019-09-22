import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  EnhancedStore
} from "redux-starter-kit";
import kanbanModule, { KanbanState } from "./modules/kanbanModule";

const rootReducer = combineReducers({ kanbanState: kanbanModule.reducer });

export interface Store {
  kanbanState: KanbanState;
}

export const setupStore = (): EnhancedStore<Store> => {
  const middlewares = [...getDefaultMiddleware()];

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares
  });

  return store;
};
