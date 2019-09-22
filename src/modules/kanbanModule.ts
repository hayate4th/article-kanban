import { createSlice } from "redux-starter-kit";
import { CardListType } from "../components/CardList";

export interface KanbanState {
  kanban: CardListType[];
}

const kanbanModule = createSlice({
  slice: "kanban",
  initialState: {
    kanban: [
      {
        id: "cardList-1",
        cardList: [
          {
            id: "card-1",
            title: "Introducing Hooks",
            url: "https://reactjs.org/docs/hooks-intro.html",
            registeredDate: "2019/09/06"
          },
          {
            id: "card-2",
            title: "Hooks at a Glance",
            url: "https://reactjs.org/docs/hooks-overview.html",
            registeredDate: "2019/09/07"
          },
          {
            id: "card-3",
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
            id: "card-1",
            title: "Hoge",
            url: "https://reactjs.org/docs/hooks-intro.html",
            registeredDate: "2019/09/06"
          },
          {
            id: "card-2",
            title: "Fuga",
            url: "https://reactjs.org/docs/hooks-overview.html",
            registeredDate: "2019/09/07"
          },
          {
            id: "card-3",
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
            id: "card-1",
            title: "むんっ",
            url: "https://reactjs.org/docs/hooks-intro.html",
            registeredDate: "2019/09/06"
          },
          {
            id: "card-2",
            title: "ほわっ",
            url: "https://reactjs.org/docs/hooks-overview.html",
            registeredDate: "2019/09/07"
          },
          {
            id: "card-3",
            title: "ぴよ",
            url: "https://reactjs.org/docs/hooks-state.html",
            registeredDate: "2019/09/07"
          }
        ]
      }
    ]
  },
  reducers: {
    deleteCard: (state, action): KanbanState => {
      return {
        kanban: state.kanban.map(item =>
          item.id !== action.payload.id
            ? item
            : {
                id: item.id,
                cardList: item.cardList.filter(
                  itemItem => itemItem.id !== action.payload.deleteId
                )
              }
        )
      };
    },
    deleteCardList: (state, action): KanbanState => {
      return {
        kanban: state.kanban.filter(item => item.id !== action.payload.deleteId)
      };
    },
    reorderCard: (state, action): KanbanState => {
      return {
        kanban: state.kanban.map(item =>
          item.id !== action.payload.id ? item : action.payload
        )
      };
    },
    reorderCardList: (state, action): KanbanState => {
      return { kanban: action.payload.kanban };
    }
  }
});

export default kanbanModule;
