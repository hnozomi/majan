import { useState } from "react";
import { Matrix } from "./components/pages/Matrix";
import { Setting } from "./components/pages/Setting";
import { PointsProvider } from "./context/MembersPointsContext";

// 設定画面とスコア表画面を切り替える
// ローカルストレージに保存しているCompleteで判断

export const App = () => {
  const Complete = localStorage.getItem("Complete");
  const [complete, setComplete] = useState(Complete);

  const onSettingComplate = () => {
    localStorage.setItem("Complete", "true");
    setComplete("true");
  };

  return complete ? (
    <PointsProvider>
      <Matrix setComplete={setComplete} />
    </PointsProvider>
  ) : (
    <Setting onSettingComplate={onSettingComplate} />
  );
};
