import React from "react";
import Card, { CardType, DeleteButton } from "../Card";
import {
  Draggable,
  DragDropContext,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import styled from "styled-components";
import { reorder } from "../../utils";
import { useDispatch } from "react-redux";
import kanbanModule from "../../modules/kanbanModule";

// ViewModel 的なやつ
export interface CardListType {
  id: string;
  cardList: CardType[];
}

interface CardListProps {
  cardList: CardListType;
  deleteCardList: () => void;
  index: number;
  isEditMode: boolean;
}

const CardList: React.FC<CardListProps> = ({
  cardList,
  deleteCardList,
  index,
  isEditMode
}) => {
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newCardList: CardType[] = reorder(
      cardList.cardList,
      result.source.index,
      result.destination.index
    );
    dispatch(
      kanbanModule.actions.reorderCard({
        id: cardList.id,
        cardList: newCardList
      })
    );
  };

  return (
    <Draggable draggableId={cardList.id} index={index}>
      {(cardListProvided): React.ReactElement => (
        <StyledDiv
          ref={cardListProvided.innerRef}
          {...cardListProvided.draggableProps}
          {...cardListProvided.dragHandleProps}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(cardProvided): React.ReactElement => (
                <div
                  ref={cardProvided.innerRef}
                  {...cardProvided.droppableProps}
                >
                  {cardList.cardList.map((card: CardType, index: number) => (
                    <Card
                      card={card}
                      index={index}
                      key={card.id}
                      isEditMode={isEditMode}
                      // TODO: dispatch() の返す型を直書きしたくない
                      deleteCard={(): {
                        type: string;
                        payload: { id: string; deleteId: string };
                      } =>
                        dispatch(
                          kanbanModule.actions.deleteCard({
                            id: cardList.id,
                            deleteId: card.id
                          })
                        )
                      }
                    />
                  ))}
                  {cardProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {isEditMode && <DeleteButton onClick={deleteCardList} />}
        </StyledDiv>
      )}
    </Draggable>
  );
};

const StyledDiv = styled.div`
  background-color: white;
  border: 2px solid blue;
  border-radius: 3px;
  margin-right: 20px;
  padding: 20px 20px 20px;
  position: relative;
  width: 204px;
`;

export default CardList;
