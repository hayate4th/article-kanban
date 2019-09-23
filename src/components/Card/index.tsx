import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import DropDownMenu from "../DropDownMenu";
import { MenuItem } from "@material-ui/core";

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
  isMenuOpen: boolean;
}

const Card: React.FC<CardProps> = ({ card, deleteCard, index, isMenuOpen }) => {
  return (
    <Draggable draggableId={card.id} index={index} isDragDisabled={isMenuOpen}>
      {(provided): React.ReactElement => (
        <ArticleDiv
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          tabIndex={-1} // div と a の両方に対して focus が当たらないようにする
        >
          <ArticleAnchor href={card.url} target="_blank">
            <ArticleTitle>{card.title}</ArticleTitle>
            <RegisteredDate>登録日: {card.registeredDate}</RegisteredDate>
          </ArticleAnchor>
          <DropDownMenu fontSize="small" size="small">
            <MenuItem key="edit" onClick={(): void => {}}>
              Edit Card
            </MenuItem>
            <MenuItem key="delete" onClick={deleteCard}>
              Delete Card
            </MenuItem>
          </DropDownMenu>
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
  height: 170px;
  padding: 20px 10px 10px;
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

export default Card;
