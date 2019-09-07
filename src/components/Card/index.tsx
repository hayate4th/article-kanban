import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

export type CardType = {
  id: string;
  title: string;
  url: string;
  registeredDate: string;
};

interface CardProps {
  card: CardType;
  index: number;
}

// TODO: styled-components のコンポーネント名をなんとかしたい
const Card: React.FC<CardProps> = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided): React.ReactElement => (
        <StyledDiv
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
  width: 204px;
`;

const StyledA = styled.a`
  background-color: white;
  border: 2px solid palevioletred;
  border-radius: 3px;
  color: black;
  display: block;
  height: 180px;
  padding: 10px;
  position: relative;
  text-decoration: none;
  width: 180px;

  &:hover {
    background-color: palevioletred;
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

export default Card;
