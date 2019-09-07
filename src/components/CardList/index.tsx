import React, { useState } from "react";
import Card, { CardType } from "../Card";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { reorder } from "../../utils";

const CardList: React.FC<{}> = () => {
  const [state, setState] = useState({
    cards: [
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
    ] as CardType[]
  });

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const cards: CardType[] = reorder(
      state.cards,
      result.source.index,
      result.destination.index
    );

    setState({ cards });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided): React.ReactElement => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {state.cards.map((card: CardType, index: number) => (
              <Card card={card} index={index} key={card.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CardList;
