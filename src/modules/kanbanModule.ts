import { createSlice } from "redux-starter-kit";
import { CardListType } from "../components/CardList";

export interface KanbanState {
  isMenuOpen: boolean;
  kanban: CardListType[];
}

const kanbanModule = createSlice({
  slice: "kanban",
  initialState: {
    isMenuOpen: false,
    kanban: [
      {
        id: "cardList-1",
        title: "TODO",
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
        title: "DOING",
        cardList: [
          {
            id: "card-4",
            title: "Hoge",
            url: "https://reactjs.org/docs/hooks-intro.html",
            registeredDate: "2019/09/06"
          },
          {
            id: "card-5",
            title: "Fuga",
            url: "https://reactjs.org/docs/hooks-overview.html",
            registeredDate: "2019/09/07"
          },
          {
            id: "card-6",
            title: "Piyo",
            url: "https://reactjs.org/docs/hooks-state.html",
            registeredDate: "2019/09/07"
          }
        ]
      },
      {
        id: "cardList-3",
        title: "DONE",
        cardList: [
          {
            id: "card-7",
            title: "むんっ",
            url: "https://reactjs.org/docs/hooks-intro.html",
            registeredDate: "2019/09/06"
          },
          {
            id: "card-8",
            title: "ほわっ",
            url: "https://reactjs.org/docs/hooks-overview.html",
            registeredDate: "2019/09/07"
          },
          {
            id: "card-9",
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
        isMenuOpen: state.isMenuOpen,
        kanban: state.kanban.map(item =>
          item.id !== action.payload.id
            ? item
            : {
                id: item.id,
                title: item.title,
                cardList: item.cardList.filter(
                  itemItem => itemItem.id !== action.payload.deleteId
                )
              }
        )
      };
    },
    deleteCardList: (state, action): KanbanState => {
      return {
        isMenuOpen: state.isMenuOpen,
        kanban: state.kanban.filter(item => item.id !== action.payload.deleteId)
      };
    },
    handleIsMenuOpen: (state, action): KanbanState => {
      return {
        isMenuOpen: action.payload,
        kanban: state.kanban
      };
    },
    reorderCard: (state, action): KanbanState => {
      return {
        isMenuOpen: state.isMenuOpen,
        kanban: state.kanban.map(item =>
          item.id !== action.payload.id ? item : action.payload
        )
      };
    },
    reorderCardList: (state, action): KanbanState => {
      return {
        isMenuOpen: state.isMenuOpen,
        kanban: action.payload.kanban
      };
    }
  }
});

export default kanbanModule;
