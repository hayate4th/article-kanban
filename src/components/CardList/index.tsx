import React from "react";
import Card, { CardType, DeleteButton } from "../Card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import kanbanModule from "../../modules/kanbanModule";

// ViewModel 的なやつ
export interface CardListType {
  id: string;
  title: string;
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

  return (
    <Draggable draggableId={cardList.id} index={index}>
      {(cardListProvided): React.ReactElement => (
        <StyledDiv
          ref={cardListProvided.innerRef}
          {...cardListProvided.draggableProps}
          {...cardListProvided.dragHandleProps}
        >
          <CardListTitle>{cardList.title}</CardListTitle>
          <Droppable droppableId={cardList.id} type="CARD">
            {(cardProvided): React.ReactElement => (
              <DropZone
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
                      payload: { id?: string; deleteId: string };
                    } => {
                      // Card が残り一つの時は CardList を削除
                      if (cardList.cardList.length < 2)
                        return dispatch(
                          kanbanModule.actions.deleteCardList({
                            deleteId: cardList.id
                          })
                        );
                      return dispatch(
                        kanbanModule.actions.deleteCard({
                          id: cardList.id,
                          deleteId: card.id
                        })
                      );
                    }}
                  />
                ))}
                {cardProvided.placeholder}
              </DropZone>
            )}
          </Droppable>
          {isEditMode && <DeleteButton onClick={deleteCardList} />}
        </StyledDiv>
      )}
    </Draggable>
  );
};

const CardListTitle = styled.h1`
  font-size: 25px;
  margin: 0;
  max-height: 150px;
  overflow: hidden;
  text-align: center;
  word-break: break-all;
`;

const DropZone = styled.div`
  height: 650px;
  overflow: scroll;
`;

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
