import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import deleteButton from "./delete_button.png";

// ViewModel 的なやつ
export interface CardType {
  id: string;
  title: string;
  url: string;
  registeredDate: string;
}

interface CardProps {
  card: CardType;
  deleteCard: () => void;
  index: number;
  isEditMode: boolean;
}

const Card: React.FC<CardProps> = ({ card, deleteCard, index, isEditMode }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided): React.ReactElement => (
        <ArticleDiv
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          tabIndex={-1} // div と a の両方に対して focus が当たらないようにする
        >
          {isEditMode && <DeleteButton onClick={deleteCard} />}
          <ArticleAnchor href={card.url} target="_blank">
            <ArticleTitle>{card.title}</ArticleTitle>
            <RegisteredDate>登録日: {card.registeredDate}</RegisteredDate>
          </ArticleAnchor>
        </ArticleDiv>
      )}
    </Draggable>
  );
};

// TODO: 複数行以上になると text-overflow: ellipsis がかかるようにする
const ArticleTitle = styled.h1`
  font-size: 25px;
  margin: 0;
  max-height: 150px;
  overflow: hidden;
  text-align: justify-all;
  word-break: break-all;
`;

// TODO: height と width が子要素に依存しまくっているのでしっかりしたい
// TODO: コンポーネント名をなんとかしたい
const ArticleDiv = styled.div`
  font-size: 25px;
  height: 204px;
  margin-bottom: 10px;
  margin-right: 0;
  position: relative;
  width: 204px;
`;

const ArticleAnchor = styled.a`
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

// TODO: span を block 要素にしたくない (span 以外を使いたい)
const RegisteredDate = styled.span`
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
