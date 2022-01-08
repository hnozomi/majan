import { Input, InputAdornment } from "@mui/material";
import { POINT_CONVERSION_COMPRESSED } from "constants";
import { createContext, useEffect, useState } from "react";

export type LoginUserContextType = {
  points: any;
  updateMatrix: (e: any, id: any, fieldName: any) => void;
};

export const AuthContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);
type Members = [
  {
    member1: number | null;
    member2: number | null;
    member3: number | null;
    member4: number | null;
  }
];

export const AuthProvider = (props: any) => {
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
    // const array: any[] = new Array(params.id).fill({
    //   member1: (
    //     <Input
    //       sx={{ textAlign: "right" }}
    //       value={points[0].member1}
    //       onChange={handleChange("member1")}
    //       endAdornment={<InputAdornment position="end">pt</InputAdornment>}
    //       inputProps={{
    //         "aria-label": "member1",
    //       }}
    //     />
    //   ),
    //   member2: (
    //     <Input
    //       sx={{ textAlign: "right" }}
    //       value={points[0].member2}
    //       onChange={handleChange("member2")}
    //       endAdornment={<InputAdornment position="end">pt</InputAdornment>}
    //       inputProps={{
    //         "aria-label": "member2",
    //       }}
    //     />
    //   ),
    //   member3: (
    //     <Input
    //       sx={{ textAlign: "right" }}
    //       value={points[0].member3}
    //       onChange={handleChange("member3")}
    //       endAdornment={<InputAdornment position="end">pt</InputAdornment>}
    //       inputProps={{
    //         "aria-label": "member3",
    //       }}
    //     />
    //   ),
    //   member4: (
    //     <Input
    //       sx={{ textAlign: "right" }}
    //       value={points[0].member4}
    //       onChange={handleChange("member4")}
    //       endAdornment={<InputAdornment position="end">pt</InputAdornment>}
    //       inputProps={{
    //         "aria-label": "member4",
    //       }}
    //     />
    //   ),
    // });

    const nullArray: any = [...array];

    for (var i = 0; i < points.length; i++) {
      nullArray[i] = points[i];
    }
    setPoints(nullArray);
  };

  const updateMatrix = (e: any, id: any, fieldName: any) => {
    // console.log(...points);
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
    <AuthContext.Provider
      value={{
        points,
        updateMatrix,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
