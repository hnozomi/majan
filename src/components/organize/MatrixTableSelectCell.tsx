import { FC, useContext } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { PointsContext } from "../../context/MembersPointsContext";
import { BETARRAYS } from "../../const/MatrixTableSelectCellConst";
import { GridRenderCellParams } from "@mui/x-data-grid";

type Props = {
  params: GridRenderCellParams;
};

export const MatrixTableSelectCell: FC<Props> = (props) => {
  const { params } = props;
  const id = params.id as number; // paramss.idは string | number (GridRowId)のため、numberのみにする
  const field = params.field;
  const { points, updateMatrix } = useContext(PointsContext);

  return (
    <>
      <Select
        variant="standard"
        sx={{ width: "100%" }}
        value={points[id - 1]?.bet}
        label="Bet"
        onChange={(e) => updateMatrix(e, id, field)}
      >
        {BETARRAYS.map((array, index) => (
          <MenuItem value={array} key={index}>
            {array}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
