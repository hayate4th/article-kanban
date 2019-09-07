import React from "react";
import CardList from "./components/CardList";

const App: React.FC<{}> = () => {
  return (
    <div>
      <CardList isEditMode={true} />
    </div>
  );
};

export default App;
