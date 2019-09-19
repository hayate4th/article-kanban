import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  EnhancedStore
} from "redux-starter-kit";
import cardListModule from "./modules/cardListModule";
import { CardListType } from "./components/CardList";

const rootReducer = combineReducers({
  kanban: cardListModule.reducer
});

export const setupStore = (): EnhancedStore<{ kanban: CardListType[] }> => {
  const middlewares = [...getDefaultMiddleware()];

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares
  });

  return store;
};
