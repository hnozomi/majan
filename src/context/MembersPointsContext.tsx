import { createContext, useEffect, useState } from "react";

export type MembersPointsType = {
  points: any;
  updateMatrix: (e: any, id: any, fieldName: any) => void;
};

export const PointsContext = createContext<MembersPointsType>(
  {} as MembersPointsType
);
type Members = [
  {
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
    { member1: 10, member2: 10, member3: null, member4: null },
  ]);

  useEffect(() => {
    createMatrix();
  }, []);

  const createMatrix = () => {
    const handleChange = (prop: any) => (event: any) => {
      //   setPoint({ ...point[params.id], [prop]: event.target.value });
    };
    const params = {
      id: 3,
    };
    const array: any[] = new Array(params.id).fill({
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

  const updateMatrix = (e: any, id: any, fieldName: any) => {
    const test = { ...points[id - 1] };
    // console.log(test, "3test");
    const temp = { ...test, [fieldName]: e.target.value };
    // console.log(temp, "temp");
    // console.log({ ...points[id], [fieldName]: e.target.value });
    // console.log(id);
    // console.log({ ...points, [id - 1]: temp });
    setPoints({ ...points, [id - 1]: temp });
    // setPoints([{ ...points[id], [fieldName]: e.target.value }]);
  };

  return (
    <PointsContext.Provider
      value={{
        points,
        updateMatrix,
      }}
    >
      {!loading && children}
    </PointsContext.Provider>
  );
};
