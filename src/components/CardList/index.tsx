import React from "react";
import Card, { CardType } from "../Card";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { reorder } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import cardListModule from "../../modules/cardListModule";

interface CardListProps {
  isEditMode: boolean;
}

const CardList: React.FC<CardListProps> = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state) as {
    cardList: CardType[];
  };

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const cardList: CardType[] = reorder(
      state.cardList,
      result.source.index,
      result.destination.index
    );
    dispatch(cardListModule.actions.reorderCard({ cardList }));
  };

  return (
    <StyledDiv>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided): React.ReactElement => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {state.cardList.map((card: CardType, index: number) => (
                <Card
                  card={card}
                  index={index}
                  key={card.id}
                  isEditMode={isEditMode}
                  // TODO: dispatch() の返す型を直書きしたくない
                  deleteCard={(): { type: string; payload: string } =>
                    dispatch(cardListModule.actions.deleteCard(card.id))
                  }
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  border: 2px solid blue;
  border-radius: 3px;
  padding: 20px 20px 20px;
  width: 204px;
`;

export default CardList;
