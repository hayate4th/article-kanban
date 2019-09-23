import { DraggableLocation } from "react-beautiful-dnd";
import { CardType } from "./components/Card";
import { KanbanState } from "./modules/kanbanModule";
import { CardListType } from "./components/CardList";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const reorderArray = (
  list: Iterable<any> | ArrayLike<any>,
  startIndex: number,
  endIndex: number
): Array<any> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderKanbanState = (
  kanbanState: KanbanState,
  source: DraggableLocation,
  destination: DraggableLocation
): KanbanState => {
  // TODO: なんとかして array から object にする方法を探したい (データ構造を変える等)
  const current: CardListType = kanbanState.kanban.filter(
    item => item.id === source.droppableId
  )[0];
  const next: CardListType = kanbanState.kanban.filter(
    item => item.id === destination.droppableId
  )[0];
  const target: CardType = current.cardList[source.index];

  // 同じ CardList 内で移動する場合
  if (source.droppableId === destination.droppableId) {
    const cardList: CardType[] = reorderArray(
      current.cardList,
      source.index,
      destination.index
    );

    return {
      kanban: kanbanState.kanban.map(item =>
        item.id !== current.id
          ? item
          : {
              id: current.id,
              title: current.title,
              cardList: cardList
            }
      )
    };
  }

  // 違う CardList に移動する場合
  const newCurrentCardList = current.cardList.filter(
    item => item.id !== target.id
  );

  const newNextCardList = [
    ...next.cardList.slice(0, destination.index),
    target,
    ...next.cardList.slice(destination.index)
  ];

  return {
    kanban: kanbanState.kanban.map(item =>
      item.id !== current.id && item.id !== next.id
        ? item
        : {
            id: item.id,
            title: item.title,
            cardList:
              item.id === current.id ? newCurrentCardList : newNextCardList
          }
    )
  };
};
