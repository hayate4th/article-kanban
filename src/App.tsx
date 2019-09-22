import React from "react";
import Kanban from "./components/Kanban";

const App: React.FC<{}> = () => {
  return (
    <div>
      <Kanban isEditMode={false} />
    </div>
  );
};

export default App;
