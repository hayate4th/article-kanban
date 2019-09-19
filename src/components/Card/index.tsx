import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import deleteButton from "./delete_button.png";

// TODO: type じゃなくてもいいかも？
export type CardType = {
  id: string;
  title: string;
  url: string;
  registeredDate: string;
};

interface CardProps {
  card: CardType;
  deleteCard: () => void;
  index: number;
  isEditMode: boolean;
}

// TODO: styled-components のコンポーネント名をなんとかしたい
// TODO: できれば Card と Draggable を分離したい
const Card: React.FC<CardProps> = ({ card, deleteCard, index, isEditMode }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided): React.ReactElement => (
        <StyledDiv
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditMode && <DeleteButton onClick={deleteCard} />}
          <StyledA href={card.url} target="_blank">
            <StyledH1>{card.title}</StyledH1>
            <StyledSpan>登録日: {card.registeredDate}</StyledSpan>
          </StyledA>
        </StyledDiv>
      )}
    </Draggable>
  );
};

// TODO: 複数行以上になると text-overflow: ellipsis がかかるようにする
const StyledH1 = styled.h1`
  font-size: 25px;
  margin: 0;
  max-height: 150px;
  overflow: hidden;
  text-align: justify-all;
  word-break: break-all;
`;

// TODO: height と width が子要素に依存しまくっているのでしっかりしたい
const StyledDiv = styled.div`
  font-size: 25px;
  height: 204px;
  margin-bottom: 10px;
  margin-right: 0;
  position: relative;
  width: 204px;
`;

const StyledA = styled.a`
  background-color: white;
  border: 2px solid orange;
  border-radius: 3px;
  color: black;
  display: block;
  height: 180px;
  padding: 10px;
  position: relative;
  text-decoration: none;
  width: 180px;
  z-index: 0;

  &:hover {
    background-color: orange;
    color: white;
  }
`;

// TODO: span を block 要素にしたくない
const StyledSpan = styled.span`
  bottom: 10px;
  display: block;
  font-size: 50%;
  position: absolute;
  right: 10px;
`;

const DeleteButton = styled.button`
  background-image: url(${deleteButton});
  border: none;
  border-radius: 10px;
  height: 20px;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  z-index: 999;
`;

export default Card;
