import React from "react";
import CardList, { CardListType } from "../CardList";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { reorderArray, reorderKanbanState } from "../../utils";
import kanbanModule, { KanbanState } from "../../modules/kanbanModule";
import { Store } from "../../store";

interface KanbanProps {
  isEditMode: boolean;
}

const Kanban: React.FC<KanbanProps> = ({ isEditMode }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: Store) => state.kanbanState);

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    if (result.type === "CARD_LIST") {
      const kanban: CardListType[] = reorderArray(
        state.kanban,
        result.source.index,
        result.destination.index
      );

      dispatch(kanbanModule.actions.reorderCardList({ kanban }));

      return;
    }

    const kanban: KanbanState = reorderKanbanState(
      state,
      result.source,
      result.destination
    );

    dispatch(kanbanModule.actions.reorderCardList(kanban));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="kanban" type="CARD_LIST" direction="horizontal">
        {(provided): React.ReactElement => (
          <FlexDiv ref={provided.innerRef} {...provided.droppableProps}>
            {state.kanban.map((cardList: CardListType, index: number) => (
              <CardList
                cardList={cardList}
                deleteCardList={(): {
                  type: string;
                  payload: { deleteId: string };
                } =>
                  dispatch(
                    kanbanModule.actions.deleteCardList({
                      deleteId: cardList.id
                    })
                  )
                }
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
  );
};

const FlexDiv = styled.div`
  border: 5px solid black;
  border-radius: 3px;
  display: flex;
  padding: 20px 20px 20px;
`;

export default Kanban;
