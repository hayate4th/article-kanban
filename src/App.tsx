import React from "react";
import Card from "./components/Card";

const App: React.FC<{}> = () => {
  return (
    <>
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
    </>
  );
};

export default App;
