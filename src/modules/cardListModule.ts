import { createSlice } from "redux-starter-kit";
import { CardListType } from "../components/CardList";

const cardListModule = createSlice({
  slice: "card",
  initialState: [
    {
      id: "cardList-1",
      cardList: [
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
      ]
    },
    {
      id: "cardList-2",
      cardList: [
        {
          id: "content-1",
          title: "Hoge",
          url: "https://reactjs.org/docs/hooks-intro.html",
          registeredDate: "2019/09/06"
        },
        {
          id: "content-2",
          title: "Fuga",
          url: "https://reactjs.org/docs/hooks-overview.html",
          registeredDate: "2019/09/07"
        },
        {
          id: "content-3",
          title: "Piyo",
          url: "https://reactjs.org/docs/hooks-state.html",
          registeredDate: "2019/09/07"
        }
      ]
    },
    {
      id: "cardList-3",
      cardList: [
        {
          id: "content-1",
          title: "むんっ",
          url: "https://reactjs.org/docs/hooks-intro.html",
          registeredDate: "2019/09/06"
        },
        {
          id: "content-2",
          title: "ほわっ",
          url: "https://reactjs.org/docs/hooks-overview.html",
          registeredDate: "2019/09/07"
        },
        {
          id: "content-3",
          title: "ぴよ",
          url: "https://reactjs.org/docs/hooks-state.html",
          registeredDate: "2019/09/07"
        }
      ]
    }
  ] as CardListType[],
  // TODO: State の型が CardType[] になっているがなんとかしたい
  reducers: {
    deleteCard: (state, action): CardListType[] => {
      return state.map(item =>
        item.id !== action.payload.id
          ? item
          : {
              id: item.id,
              cardList: item.cardList.filter(
                itemItem => itemItem.id !== action.payload.deleteId
              )
            }
      );
    },
    reorderCard: (state, action): CardListType[] => {
      return state.map(item =>
        item.id !== action.payload.id ? item : action.payload
      );
    },
    reorderCardList: (state, action): CardListType[] => action.payload.kanban
  }
});

export default cardListModule;
