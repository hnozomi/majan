import { FC, useContext } from "react";

import { Input, InputAdornment } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

import { PointsContext } from "../../context/MembersPointsContext";
import { UNIT } from "../../const/MatrixConst";

type Props = {
  params: GridRenderCellParams;
};

export const MatrixTableInputCell: FC<Props> = (props) => {
  const { params } = props;
  const { updateMatrix, points } = useContext(PointsContext);

  const id = params.id as number; // paramss.idは string | number (GridRowId)のため、numberのみにする
  const field = params.field;

  return (
    <Input
      type="tel"
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
