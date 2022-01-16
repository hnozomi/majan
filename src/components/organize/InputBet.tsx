import { Input, InputAdornment } from "@mui/material";
import { FC, useContext } from "react";
import { PointsContext } from "../../context/MembersPointsContext";

type Props = {
  fieldName: string;
  id: any;
};

export const InputBet: FC<Props> = (props) => {
  const { updateMatrix, points } = useContext(PointsContext);
  const { fieldName, id } = props;
  console.log(points, id, fieldName);
  // console.log(points[id + 1][fieldName]);
  return (
    <Input
      type="number"
      sx={{ textAlign: "right" }}
      value={
        points[id - 1][fieldName] === null ? "" : points[id - 1][fieldName]
      }
      onChange={(e) => updateMatrix(e, id, fieldName)}
      endAdornment={<InputAdornment position="end">pt</InputAdornment>}
      inputProps={{
        "aria-label": "member1",
      }}
    />
  );
};
