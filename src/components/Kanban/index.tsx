import React from "react";
import CardList, { CardListType } from "../CardList";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { reorder } from "../../utils";
import cardListModule from "../../modules/cardListModule";

interface KanbanProps {
  isEditMode: boolean;
}

const Kanban: React.FC<KanbanProps> = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state) as {
    kanban: CardListType[];
  };

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const kanban: CardListType[] = reorder(
      state.kanban,
      result.source.index,
      result.destination.index
    );
    dispatch(cardListModule.actions.reorderCardList({ kanban }));
  };

  return (
    <StyledDiv>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" direction="horizontal">
          {(provided): React.ReactElement => (
            <FlexDiv ref={provided.innerRef} {...provided.droppableProps}>
              {state.kanban.map((cardList: CardListType, index: number) => (
                <CardList
                  cardList={cardList}
                  index={index}
                  key={cardList.id}
                  isEditMode={isEditMode}
                />
              ))}
              {provided.placeholder}
            </FlexDiv>
          )}
        </Droppable>
      </DragDropContext>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  border: 5px solid black;
  border-radius: 3px;
  padding: 20px 20px 20px;
`;

const FlexDiv = styled.div`
  display: flex;
`;

export default Kanban;
