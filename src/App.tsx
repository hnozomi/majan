import { useState } from "react";
import { Setting } from "./components/pages/Setting";

export const App = () => {
  const Complete = localStorage.getItem("Complete");
  const [complete, setComplete] = useState(Complete);

  const onComplate = () => {
    localStorage.setItem("Complete", "true");
    setComplete("true");
  };
  return <Setting onComplate={onComplate} />;
};
