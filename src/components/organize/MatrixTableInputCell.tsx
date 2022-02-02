import { FC, memo, useContext } from "react";

import { Input, InputAdornment } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";

import { PointsContext } from "../../context/MembersPointsContext";
import { UNIT } from "../../const/MatrixConst";

type Props = {
  id: GridRowId;
  field: string;
};

type Test = {
  [key: string]: number;
};

export const MatrixTableInputCell: FC<Props> = memo((props) => {
  const { id, field } = props;
  const { updateMatrix, points } = useContext(PointsContext);

  const numberId = id as number; // paramss.idは string | number (GridRowId)のため、numberのみにする

  return (
    <Input
      type="tel"
      sx={{ textAlign: "right" }}
      value={
        points[numberId - 1][field] === null ? "" : points[numberId - 1][field]
      }
      onChange={(e) => updateMatrix(e, numberId, field)}
      endAdornment={
        <InputAdornment position="end">{UNIT.point}</InputAdornment>
      }
    />
  );
});
