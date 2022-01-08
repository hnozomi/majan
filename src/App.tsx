import { useState } from "react";
import { Matrix } from "./components/pages/Matrix";
import { Setting } from "./components/pages/Setting";
import { AuthProvider } from "./hooks/useMakeMatrix";

export const App = () => {
  const Complete = localStorage.getItem("Complete");
  const [complete, setComplete] = useState(Complete);

  const onComplate = () => {
    localStorage.setItem("Complete", "true");
    setComplete("true");
  };
  // return <Setting onComplate={onComplate} />;
  return complete ? (
    <AuthProvider>
      <Matrix />
    </AuthProvider>
  ) : (
    <Setting onComplate={onComplate} />
  );
};
