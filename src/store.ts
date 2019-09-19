import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  EnhancedStore
} from "redux-starter-kit";
import cardListModule from "./modules/cardListModule";
import { CardType } from "./components/Card";

const rootReducer = combineReducers({
  cardList: cardListModule.reducer
});

export const setupStore = (): EnhancedStore<{ cardList: CardType[] }> => {
  const middlewares = [...getDefaultMiddleware()];

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares
  });

  return store;
};
