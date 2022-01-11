import { Input, InputAdornment } from "@mui/material";
import { FC, memo, useContext, useEffect, useState } from "react";
import { PointsContext } from "../../context/MembersPointsContext";
import { InputBet } from "./InputBet";

type Props = {
  params: any;
};
type Member = {
  member1: number;
  member2: number;
  member3: number;
  member4: number;
};

export const DisplayPoints: FC<Props> = (props) => {
  const { params } = props;
  const { points } = useContext(PointsContext);

  const [displayArray, setDisplayArray] = useState([]);
  const [loading, setLoading] = useState(true);

  // const mergeArray = () => {
  //   const array: any[] = new Array(params.id).fill({
  //     member1: (
  //       <Input
  //         sx={{ textAlign: "right" }}
  //         value={point[0].member1}
  //         onChange={handleChange("member1")}
  //         endAdornment={<InputAdornment position="end">pt</InputAdornment>}
  //         inputProps={{
  //           "aria-label": "member1",
  //         }}
  //       />
  //     ),
  //     member2: null,
  //     member3: null,
  //     member4: null,
  //   });

  //   const nullArray: any = [...array];

  //   for (var i = 0; i < points.length; i++) {
  //     nullArray[i] = points[i];
  //   }
  //   setDisplayArray(nullArray);
  //   setLoading(true);
  // };

  // useEffect(() => {
  //   mergeArray();
  // }, []);

  // const handleChange = (prop: any) => (event: any) => {
  //   console.log(params.id);
  //   console.log(prop, "props");
  //   console.log(displayArray, "displayArray");
  //   setPoint({ ...point[params.id], [prop]: event.target.value });
  // };

  const fieldName: keyof Member = params.field;

  return (
    <>
      {loading && (
        <>
          {/* {console.log(points, "point")}
          {console.log(points[0], "id")}
          {console.log(params.id, "params.id")}
          {console.log(points[params.id - 1][fieldName])} */}
          {/* {points[params.id - 1][fieldName] === null ? (
            <InputBet fieldName={fieldName} id={params.id} />
          ) : (
            <p>{points[params.id - 1][fieldName]}</p>
          )} */}
          <InputBet fieldName={fieldName} id={params.id} />
        </>
      )}
    </>
  );
};
