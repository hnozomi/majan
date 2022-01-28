import { FC, useContext } from "react";

import { Input, InputAdornment } from "@mui/material";

import { PointsContext } from "../../context/MembersPointsContext";
import { UNIT } from "../../const/MatrixConst";

type Props = {
  params: any;
};

export const MatrixTableInputCell: FC<Props> = (props) => {
  const { updateMatrix, points } = useContext(PointsContext);
  const { params } = props;
  const { field, id } = params;
  return (
    <Input
      type="number"
      sx={{ textAlign: "right" }}
      value={points[id - 1][field] === null ? "" : points[id - 1][field]}
      onChange={(e) => updateMatrix(e, id, field)}
      endAdornment={
        <InputAdornment position="end">{UNIT.point}</InputAdornment>
      }
      inputProps={{
        "aria-label": "member1",
      }}
    />
  );
};
