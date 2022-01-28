import { createContext, useEffect, useState } from "react";

export type MembersPointsType = {
  points: any;
  updateMatrix: (e: any, id: number, fieldName: string) => void;
  updateRow: () => void;
};

export const PointsContext = createContext<MembersPointsType>(
  {} as MembersPointsType
);

type ScoreRowsType = {
  bet: string;
  member1: number | null;
  member2: number | null;
  member3: number | null;
  member4: number | null;
};

export const PointsProvider = (props: any) => {
  const { children } = props;
  const [points, setPoints] = useState<Array<ScoreRowsType>>([
    { bet: "", member1: null, member2: null, member3: null, member4: null },
  ]);

  useEffect(() => {
    createMatrix();
  }, []);

  const createMatrix = () => {
    const array: any[] = new Array(3).fill({
      bet: "",
      member1: null,
      member2: null,
      member3: null,
      member4: null,
    });

    const nullArray: any = [...array];

    for (var i = 0; i < points.length; i++) {
      nullArray[i] = points[i];
    }
    setPoints(nullArray);
  };

  const updateRow = () => {
    const row = {
      bet: "",
      member1: null,
      member2: null,
      member3: null,
      member4: null,
    };
    setPoints([...points, row]);
  };

  const updateMatrix = (e: any, id: number, fieldName: string) => {
    console.log(id, fieldName);
    const sliceArray = { ...points[id - 1] }; //配列から対象のIndex部分のみ抜き出す  [id - 1]のみ抽出
    if (e.target.value === "") {
      const temp = { ...sliceArray, [fieldName]: null };
      points[id - 1] = temp;
      setPoints([...points]);
    } else {
      const temp = { ...sliceArray, [fieldName]: e.target.value }; //対象の値を変更する [0]のfieldNameの値を変更
      points[id - 1] = temp; // index[0]を更新した情報(temp)で更新する
      setPoints([...points]); //index[0]に変更した値を戻したい
    }
  };

  console.log(points);
  return (
    <PointsContext.Provider
      value={{
        points,
        updateRow,
        updateMatrix,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
};
