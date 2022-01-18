import { createContext, useEffect, useState } from "react";

export type MembersPointsType = {
  points: any;
  updateMatrix: (e: any, id: any, fieldName: any) => void;
  updateRow: () => void;
};

export const PointsContext = createContext<MembersPointsType>(
  {} as MembersPointsType
);
type Members = [
  {
    bet: string;
    member1: number | null;
    member2: number | null;
    member3: number | null;
    member4: number | null;
  }
];

export const PointsProvider = (props: any) => {
  const { children, fieldName, id } = props;
  const [loading, setLoading] = useState(false);
  const [points, setPoints]: any = useState<Members>([
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

  // const updateRow = () => {
  //   for (var i = 0; i < points.length; i++) {
  //     nullArray[i] = points[i];
  //   }
  //   setPoints(nullArray);
  // };

  const updateMatrix = (e: any, id: any, fieldName: any) => {
    const test = { ...points[id - 1] }; //配列から対象のIndex部分のみ抜き出す  [0]のみ抽出
    // console.log(test, "3test");
    console.log(test);
    if (e.target.value === "") {
      const temp = { ...test, [fieldName]: 0 };
      points[id - 1] = temp;
      setPoints([...points]);
    } else {
      const temp = { ...test, [fieldName]: e.target.value }; //対象の値を変更する [0]のfieldNameの値を変更
      console.log(temp);
      // console.log(temp, "temp");
      // console.log({ ...points[id], [fieldName]: e.target.value });
      // console.log(id);
      // console.log({ ...points, [id - 1]: temp });
      // setPoints([...points, temp]);
      console.log(id - 1);
      points[id - 1] = temp; // index[0]を更新した情報(temp)で更新する
      console.log(points);
      setPoints([...points]); //index[0]に変更した値を戻したい
      // setPoints([{ ...points[id], [fieldName]: e.target.value }]);
    }
  };

  return (
    <PointsContext.Provider
      value={{
        points,
        updateRow,
        updateMatrix,
      }}
    >
      {!loading && children}
    </PointsContext.Provider>
  );
};
