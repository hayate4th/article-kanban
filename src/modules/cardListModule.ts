import { createSlice } from "redux-starter-kit";
import { CardType } from "src/components/Card";

const cardListModule = createSlice({
  slice: "card",
  initialState: [
    {
      id: "content-1",
      title: "Introducing Hooks",
      url: "https://reactjs.org/docs/hooks-intro.html",
      registeredDate: "2019/09/06"
    },
    {
      id: "content-2",
      title: "Hooks at a Glance",
      url: "https://reactjs.org/docs/hooks-overview.html",
      registeredDate: "2019/09/07"
    },
    {
      id: "content-3",
      title: "Using the State Hook",
      url: "https://reactjs.org/docs/hooks-state.html",
      registeredDate: "2019/09/07"
    }
  ] as CardType[],
  // TODO: State の型が CardType[] になっているがなんとかしたい
  reducers: {
    deleteCard: (state, action): CardType[] =>
      state.filter(item => item.id !== action.payload),
    reorderCard: (state, action): CardType[] => action.payload.cardList
  }
});

export default cardListModule;
