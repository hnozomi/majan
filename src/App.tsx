import { useState } from "react";
import { Matrix } from "./components/pages/Matrix";
import { Setting } from "./components/pages/Setting";
import { PointsProvider } from "./context/MembersPointsContext";

export const App = () => {
  const Complete = localStorage.getItem("Complete");
  const [complete, setComplete] = useState(Complete);

  const onComplate = () => {
    localStorage.setItem("Complete", "true");
    setComplete("true");
  };
  // return <Setting onComplate={onComplate} />;
  return complete ? (
    <PointsProvider>
      <Matrix />
    </PointsProvider>
  ) : (
    <Setting onComplate={onComplate} />
  );
};
