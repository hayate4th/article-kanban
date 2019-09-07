import React from "react";
import Card from "../Card";
import styled from "styled-components";

const CardList: React.FC<{}> = () => {
  return (
    <StyledDiv>
      <Card
        title="Introducing Hooks"
        url="https://reactjs.org/docs/hooks-intro.html"
        registerdDate="2019/09/06"
      />
      <Card
        title="Hooks at a Glance"
        url="https://reactjs.org/docs/hooks-overview.html"
        registerdDate="2019/09/07"
      />
      <Card
        title="Using the State Hook"
        url="https://reactjs.org/docs/hooks-state.html"
        registerdDate="2019/09/07"
      />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  div {
    margin-bottom: 10px;
  }

  div:last-child {
    margin-bottom: 0;
  }
`;

export default CardList;
